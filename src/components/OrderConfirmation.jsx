// OrderConfirmation.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const OrderConfirmation = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/order/${id}`);
        setOrderDetails(response.data.order);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (!orderDetails) return <div>Loading...</div>;

  return (
    <Container>
      <h2>Order Confirmation</h2>
      <p>Your order has been placed successfully!</p>
      <div>
        <h5>Order Summary</h5>
        <p>Order ID: {orderDetails.id}</p>
        <p>Total Amount: ₹{orderDetails.totalAmount}</p>
        <p>Status: {orderDetails.paymentDetails.status}</p>
        <h6>Shipping Details</h6>
        <p>{orderDetails.user.name}</p>
        <p>{orderDetails.user.address}, {orderDetails.user.pincode}</p>
      </div>
      <Button variant="primary" onClick={() => window.location.href = '/shop'}>
        Continue Shopping
      </Button>
    </Container>
  );
};

export default OrderConfirmation;
