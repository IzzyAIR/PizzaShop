import { configureStore } from '@reduxjs/toolkit'
import filterS from './Slice/filterSlice';
import cartSlice from './Slice/cartSlice';
import pizzaSlice from './Slice/pizzaSlice';


export const store = configureStore({
    reducer: {
        filterS,
        cartSlice,
        pizzaSlice,
    },
})
