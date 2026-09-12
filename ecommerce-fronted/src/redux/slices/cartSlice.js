import { createSlice } from "@reduxjs/toolkit";

const savedCart = localStorage.getItem("cart");

const initialState = {
  items: savedCart ? JSON.parse(savedCart) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);

      localStorage.setItem(
        "cart",
        JSON.stringify(state.items)
      );
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload
      );

      localStorage.setItem(
        "cart",
        JSON.stringify(state.items)
      );
    },

    clearCart: (state) => {
      state.items = [];

      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;