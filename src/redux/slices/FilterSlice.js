import { createSlice } from "@reduxjs/toolkit";
//  initial state это начальное состояние
const initialState = {
  categoryIndex: 0,
  pageCount: 1,
  sortIndex: {
    name: "популярности",
    sortProperty: "rating",
  },
};
// само хранилище тн Slice
export const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    // state это состояние на данный момент, action это действие по изменению state
    setCategoryIndex(state, action) {
      // action.payload данные которые приходят в state
      state.categoryIndex = action.payload;
    },
    setSortIndex: (state, action) => {
      state.sortIndex = action.payload;
    },
    setPageCount: (state, action) => {
      state.pageCount = action.payload;
    },
  },
});

export const { setCategoryIndex, setSortIndex, setPageCount } =
  FilterSlice.actions;

export default FilterSlice.reducer;
