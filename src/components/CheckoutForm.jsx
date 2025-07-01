import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearCart } from "./CartSlice";
import { placeOrder } from "./OrderSlice";
import { toast } from 'react-toastify';

const CheckoutForm = () => {
  const [addressDetails, setAddressDetails] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const cartItems = useSelector((state) => state.cart);
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const loadRazorpay = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/create-order", {
        totalAmount,
      });

      const options = {
        key: "rzp_test_kdYVGYT4yMFIaT", // <-- yahan Razorpay key id dalni hai
        amount: data.amount,
        currency: data.currency,
        name: "Your Shop Name",
        description: "Thank you for shopping",
        image: "https://yourlogo.com/logo.png", // optional
        order_id: data.id,
        handler: async function (response) {
          try {
            await axios.post("http://localhost:5000/checkout", {
              user: addressDetails,
              items: cartItems,
              total: totalAmount,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
            });

            dispatch(placeOrder({ ...addressDetails, items: cartItems, total: totalAmount }));
            dispatch(clearCart());
            toast.success("Payment successful and Order placed!");
            navigate(`/order-confirmation/${data.id}`);
          } catch (error) {
            console.error("Error saving order:", error);
          }
        },
        prefill: {
          name: addressDetails.name,
          email: "user@example.com", // Optional
          contact: addressDetails.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error loading Razorpay:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loadRazorpay();
  };

  return (
    <Container>
      <h2>Checkout</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={addressDetails.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your phone number"
                name="phone"
                value={addressDetails.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your address"
            name="address"
            value={addressDetails.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formPincode">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your pincode"
                name="pincode"
                value={addressDetails.pincode}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="mt-3">
          Pay Now & Place Order
        </Button>
      </Form>
    </Container>
  );
};

export default CheckoutForm;
