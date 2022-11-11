import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPizza = createAsyncThunk('pizza/fetchPizzaStatus', async (params) => {
	const { order, sortBy, category, currentPage } = params;
	const response = await axios.get(
		`https://633af5e2e02b9b64c61bef81.mockapi.io/PizzaBlock?page=${currentPage}&limit=8${category}&sortBy=${sortBy}&order=${order}`,
	);
	 
	return response.data;
});


console.log("answer", fetchPizza());

const initialState = {
	items: [],
	status: 'loading', //loading | success | error
};
const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		
	},
    extraReducers: {
        [fetchPizza.pending] : (state)=> {
            console.log("Идёт запрос");
			state.status = 'loading';
			state.items = [];

        },
        [fetchPizza.fulfilled] : (state, action)=> {
            console.log("всё ок");
			state.status = 'success';
			state.items = action.payload;
        },
        [fetchPizza.rejected] : (state)=> {
            console.log("Была ошибка");
			state.status = 'error';
			state.items = [];
        }
    }
});

export const selectPizzaData = (state) => state.pizzaSlice;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
