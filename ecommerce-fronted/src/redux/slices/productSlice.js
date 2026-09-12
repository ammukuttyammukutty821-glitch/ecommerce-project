import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setProductError: (state, action) => {
      state.error = action.payload;
    },

    clearProducts: (state) => {
      state.products = [];
    },
  },
});

export const {
  setProducts,
  setLoading,
  setProductError,
  clearProducts,
} = productSlice.actions;

export default productSlice.reducer;