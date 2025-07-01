// OrderTracking.jsx

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const OrderTracking = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/order/${orderId}`);
        setOrderDetails(response.data.order);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!orderDetails) return <div>Loading...</div>;

  return (
    <Container>
      <h2>Order Tracking</h2>
      <h5>Order ID: {orderDetails.orderId}</h5>
      <Row>
        <Col>
          <h6>Status: {orderDetails.orderStatus}</h6>
          <ListGroup>
            <ListGroup.Item>Payment Status: {orderDetails.paymentDetails.status}</ListGroup.Item>
            <ListGroup.Item>Shipping Status: {orderDetails.orderStatus}</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderTracking;
