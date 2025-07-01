import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderSuccess = ({ orderId }) => {
  return (
    <Card className="text-center p-4 mt-5">
      <h4>✅ Order Placed Successfully!</h4>
      <p>Your order ID: <strong>{orderId}</strong></p>
      <Link to="/orders" className="btn btn-primary mt-3">
        View Your Orders
      </Link>
    </Card>
  );
};

export default OrderSuccess;
