import { useEffect, useState } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { addTodo, deleteTodo, getTodos } from "./api/todos";
import { TTodo } from "./reducers/todoSlice";
import { Button, TextField } from "@mui/material";
import Loader from "./components/Loader";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

const App = () => {
  const todos = useAppSelector<TTodo[]>(({ todos }) => todos.list);
  const loading = useAppSelector<boolean>(({ todos }) => todos.loading);
  const dispatch = useAppDispatch();
  const [text, setText] = useState<string>("");

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleChange = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim().length === 0) {
      alert("Please Add Title");
    } else {
      dispatch(addTodo(text));
      setText("");
    }
  };

  return (
    <div>
      <h1 className="text-center font-bold text-[35px] text-[blue]">
        Todo<b className="text-[red]">List</b>
      </h1>
      <br />
      {loading ? <Loader /> : null}
      <form className="flex items-end gap-3" onSubmit={handleChange}>
        <TextField
          variant="standard"
          label="Add"
          value={text}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setText(event.target.value)
          }
        />
        <Button
          type="submit"
          variant="contained"
          color="success"
          endIcon={<GroupAddIcon />}
        >
          Add
        </Button>
      </form>
      {todos.length > 0
        ? todos.map((todo: TTodo) => {
            return (
              <div key={todo.id}>
                <div className="flex items-center gap-5 pt-3">
                  <input className="cursor-pointer" type="checkbox" />
                  <span>
                    {todo.complete ? <s>{todo.title}</s> : todo.title}
                  </span>
                  <Button
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default App;
