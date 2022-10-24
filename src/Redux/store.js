import { configureStore } from '@reduxjs/toolkit'
import filterS from './Slice/filterSlice';

export const store = configureStore({
  reducer: {
    filterS,
  },
})
