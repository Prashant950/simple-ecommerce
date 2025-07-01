import React from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderSummary = () => {
  const orders = useSelector((state) => state.order.orders);

  return (
    <Container>
      <h2>Your Orders</h2>
      <ListGroup>
        {orders.map((order) => (
          <ListGroup.Item key={order._id}>
            <Link to={`/orders/${order._id}`}>Order ID: {order._id}</Link>
            <span className="float-right">Total: ${order.total}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default OrderSummary;
