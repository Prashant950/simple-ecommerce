// Orders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Spinner, Container } from "react-bootstrap";
import moment from "moment";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/orders");
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch orders", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <h3 className="mb-4">My Orders</h3>
      <Row>
        {orders.length === 0 ? (
          <p className="text-muted">You haven't placed any orders yet.</p>
        ) : (
          orders.map((order) => (
            <Col md={6} lg={4} key={order._id} className="mb-4">
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>Order ID:{order._id}</Card.Title>
                  <p>
                    <strong>Name:</strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Phone:</strong> {order.user.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.user.address},{" "}
                    {order.user.pincode}
                  </p>
                  <p>
                    <strong>Total:</strong> ₹{order.total}
                  </p>
                  <hr />
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge bg-${
                        order.status === "Pending"
                          ? "warning"
                          : order.status === "Shipped"
                          ? "info"
                          : "success"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                  <p>
                    <strong>Items:</strong>
                  </p>
                  <ul>
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.title || item.name} x {item.quantity || 1}
                      </li>
                    ))}
                  </ul>
                </Card.Body>

                <Card.Footer className="text-muted">
                  Placed on:{" "}
                  {moment(order.createdAt).format("Do MMMM YYYY, h:mm A")}
                </Card.Footer>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Orders;
