import { configureStore } from "@reduxjs/toolkit";
import FilterSlice from "../redux/slices/FilterSlice";
import cartSlice from "../redux/slices/cartSlice";
export const store = configureStore({
  reducer: {
    FilterSlice,
    cartSlice,
  },
});
