// Cart.jsx
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Row, Col } from "react-bootstrap";
import { removeItem, adjustQuantity, clearCart } from "../components/CartSlice";
import { useNavigate } from "react-router-dom";  // Make sure to import useNavigate
import axios from "axios";

const Cart = () => {
  const productsInCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return productsInCart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(adjustQuantity({ id, quantity }));
    }
  };

  const handleCheckout = () => {
    navigate("/checkout"); // Navigate to the CheckoutForm when checkout is clicked
  };

  return (
    <>
      <h2>Your Cart</h2>
      <Row>
        {productsInCart.map((product, index) => (
          <Col md={3} key={index}>
            <Card style={{ width: "18rem" }}>
              <div className="text-center">
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{ height: "150px", width: "150px" }}
                />
              </div>
              <Card.Body>
                <Card.Title className="text-center">{product.title}</Card.Title>
                <Card.Text>₹{product.price}</Card.Text>

                <div className="d-flex justify-content-between align-items-center">
                  <Button
                    variant="secondary"
                    onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                  >
                    -
                  </Button>
                  <span>{product.quantity}</span>
                  <Button
                    variant="secondary"
                    onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </Card.Body>

              <Card.Footer style={{ backgroundColor: "lightgrey" }}>
                <Button variant="danger" onClick={() => handleRemove(product.id)}>
                  Remove
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="mt-4">
        <h4>Total: ₹{calculateTotal()}</h4>
        <Button
          variant="success"
          onClick={handleCheckout}
          disabled={productsInCart.length === 0}
        >
          Proceed to Checkout
        </Button>
      </div>
    </>
  );
};

export default Cart;
