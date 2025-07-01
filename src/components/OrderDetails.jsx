import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();  // Retrieve the order ID from the URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/${id}`);
      setOrder(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching order details", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!order) {
    return <p className="text-center mt-5">Order not found.</p>;
  }

  return (
    <div className="container mt-4">
      <h3>Order Details</h3>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Order ID: {order._id}</Card.Title>
          <p><strong>Name:</strong> {order.user.name}</p>
          <p><strong>Phone:</strong> {order.user.phone}</p>
          <p><strong>Address:</strong> {order.user.address}, {order.user.pincode}</p>
          <p><strong>Total:</strong> ₹{order.total}</p>

          <h5>Items:</h5>
          <ul>
            {order.items.map((item, idx) => (
              <li key={idx}>
                <strong>{item.title}</strong> x {item.quantity || 1} - ₹{item.price * (item.quantity || 1)}
              </li>
            ))}
          </ul>
        </Card.Body>
        <Card.Footer className="text-muted">
          Placed on: {new Date(order.createdAt).toLocaleString()}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default OrderDetails;
