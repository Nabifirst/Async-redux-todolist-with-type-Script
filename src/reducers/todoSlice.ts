import { createSlice } from '@reduxjs/toolkit'
import { addTodo, deleteTodo, getTodos } from '../api/todos';

export type TTodo = {
  id: number,
  title:string,
  complete:boolean
}

interface ITodosState {
    list :TTodo[];
    loading:boolean;
}

const initialState : ITodosState = {
    list:[],
    loading:false,
}

const setLoading = (state:ITodosState) => {
    state.loading = true
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
  },
  extraReducers:(builder) => {
    builder.addCase(getTodos.pending,setLoading);
    builder.addCase(getTodos.fulfilled,(state,action) => {
        state.list = action.payload;
        state.loading = false;
    });
    builder.addCase(getTodos.rejected,(state) => {
        state.loading = false;
    });

    builder.addCase(addTodo.pending,setLoading);
    builder.addCase(addTodo.fulfilled,(state) => {
        state.loading = false;
    });
    builder.addCase(addTodo.rejected,(state) => {
        state.loading = false;
    });

    builder.addCase(deleteTodo.pending,setLoading);
    builder.addCase(deleteTodo.fulfilled,(state) => {
        state.loading = false;
    });
    builder.addCase(deleteTodo.rejected,(state) => {
        state.loading = false;
    });


   

  },
  
})

export const {} = todoSlice.actions

// export const selectCount = (state: RootState) => state.counter.value

export default todoSlice.reducer