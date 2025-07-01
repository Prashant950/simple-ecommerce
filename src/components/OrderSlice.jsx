// src/redux/orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    currentOrder: null,
  },
  reducers: {
    placeOrder: (state, action) => {
      state.orders.push(action.payload);
      state.currentOrder = action.payload;
    },
    clearOrder: (state) => {
      state.currentOrder = null;
    },
  },
});

export const { placeOrder, clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
