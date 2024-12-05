import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // cart: [],

  cart: [
    {
      pizzaID: 1,
      name: "Pizzzza Plus",
      quantity: 2,
      unitPrice: 16,
      totalPrice: 3333,
    },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter(
        (pizza) => pizza.pizzaID !== action.payload,
      );
    },
    increaseItemQuantity(state, action) {
      const pizza = state.cart.find(
        (pizza) => pizza.pizzaID === action.payload,
      );
      pizza.quantity++;
      pizza.totalPrice = pizza.unitPrice * pizza.quantity;
    },
    decreaseItemQuantity(state, action) {
      const pizza = state.cart.find(
        (pizza) => pizza.pizzaID === action.payload,
      );
      pizza.quantity--;
      pizza.totalPrice = pizza.unitPrice * pizza.quantity;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
