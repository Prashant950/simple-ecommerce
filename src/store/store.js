import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../components/ProductSlice'
import CartReducer from '../components/CartSlice'
import orderReducer from "../components/OrderSlice"



const store = configureStore({
    reducer:{
       
        products:productsReducer,
        cart :CartReducer,
        order:orderReducer
       
       
    }
})

export default store;