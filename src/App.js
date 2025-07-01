import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { Container } from "react-bootstrap";
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from "./components/Dashboard";
import Forgetpasswod from "./components/forgot-password"
import VerifyOtp from "./components/VerifyOtp"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Products from "./components/Products"
import Cart from "./components/cart"
import Navigation from "./components/Navigation"
import OrderDetails  from "./components/OrderDetails"
import Orders from "./components/Orders"
import CheckoutForm from "./components/CheckoutForm"
import OrderConfirmation from "./components/OrderConfirmation"
import OrderSummary from "./components/OrderSummary";
import ProductDetails from "./components/ProductDetails";
import Profile from "./components/Profile";
import OrderTracking from "./components/OrderTracking";
// import PaymentConfirmation from "./components/PaymentConfirmation";




function App() {
  return (
    <>
   <Router>
    <Navigation/>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<Forgetpasswod />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
        {/* <Route path="/payment-confirmation/:orderId" element={<PaymentConfirmation />} /> */}


        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/orders" element={<Orders />}/>
        <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </>
  );
}

export default App; 
