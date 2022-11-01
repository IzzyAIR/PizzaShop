import { configureStore } from '@reduxjs/toolkit'
import filterS from './Slice/filterSlice';
import cartSlice from './Slice/cartSlice';

export const store = configureStore({
  reducer: {
    filterS,
    cartSlice,
  },
})
