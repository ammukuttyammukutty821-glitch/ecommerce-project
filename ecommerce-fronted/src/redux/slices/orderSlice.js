import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },

    setOrderLoading: (state, action) => {
      state.loading = action.payload;
    },

    setOrderError: (state, action) => {
      state.error = action.payload;
    },

    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },

    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const {
  setOrders,
  setOrderLoading,
  setOrderError,
  addOrder,
  clearOrders,
} = orderSlice.actions;

export default orderSlice.reducer;