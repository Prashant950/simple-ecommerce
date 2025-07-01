// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import axios from 'axios'


// // First, create the thunk
// export const getproducts = createAsyncThunk(
//   'products/getproducts',
//   async () => {
//     const {data} = await axios.get("http://localhost:5000/products")
//     return data;
//   },
// )

// // Then, handle actions in your reducers:
// const usersSlice = createSlice({
//   name: 'products',
//   initialState:{ data: [], status: "idle" },
//   reducers: {
//     // standard reducer logic, with auto-generated action types per reducer
//   },
//   extraReducers: (builder) => {
//     builder
//             .addCase(getproducts.pending, (state) => {
//                 state.status = "loading";
//             })
//             .addCase(getproducts.fulfilled, (state, { payload }) => {
//                 state.status = "succeeded";
//                 state.data = payload;
//             })
//             .addCase(getproducts.rejected, (state) => {
//                 state.status = "error";
//             });
// },
//   });

// export default usersSlice.reducer;


// ProductSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getproducts = createAsyncThunk("products/get", async () => {
  const res = await axios.get("http://localhost:5000/products");
  return res.data;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    originalData: [],
    data: [],
    status: "idle",
  },
  reducers: {
    filterBySearch: (state, action) => {
      const term = action.payload.toLowerCase();
      state.data = state.originalData.filter(product =>
        product.title.toLowerCase().includes(term)
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getproducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getproducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.originalData = action.payload;
        state.status = "success";
      });
  },
});

export const { filterBySearch } = productSlice.actions;
export default productSlice.reducer;


