import {createAsyncThunk} from '@reduxjs/toolkit' 
import axios from 'axios'
import { TTodo } from '../reducers/todoSlice';

//Get
const API = 'http://localhost:3000/todos';
export const getTodos = createAsyncThunk("todos/getTodos",async function () {
     try {
        const {data} = await axios.get(API);
        return data;
     } catch (error) {
        
     }
})


//Add
export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async function (text:string, { dispatch }) {
    try {
      const obj:TTodo = {
        id: Date.now(),
        title: text,
        complete: false,
      };
      const { data } = await axios.post(API, obj);
      dispatch(getTodos());
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

//Delete
export const deleteTodo = createAsyncThunk(
    "todos/deleteTodo",
    async function (id:number, { dispatch }) {
      try {
        const res = await axios.delete(`${API}/${id}`);
        dispatch(getTodos());
        return res
      } catch (error) {
        console.log(error);
      }
    }
  );
