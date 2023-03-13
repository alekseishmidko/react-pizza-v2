import { createSlice } from "@reduxjs/toolkit";
//  initial state это начальное состояние
const initialState = {
  totalPrice: 0,
  items: [],
};
// само хранилище тн Slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // state это состояние на данный момент, action это действие по изменению state
    addItem(state, action) {
      // action.payload данные которые приходят в state
      state.items.push(action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price + sum;
      }, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearItems(state, action) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
