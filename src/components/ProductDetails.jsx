import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../components/CartSlice"; 
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";


const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const product = useSelector((state) =>
    state.products.data.find((item) => item.id === parseInt(id))
  );

  if (!product) {
    return <div className="text-center mt-5">Product not found</div>;
  }

  const handleAddToCart = () => {
    dispatch(addItem({ ...product, quantity }));
    navigate("/cart");
  };

  return (
    <div className="container mt-5">
      <div className="row shadow rounded bg-white p-4">
        {/* Image */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{ maxHeight: "500px", objectFit: "contain" }}
          />
        </div>

        {/* Details */}
        <div className="col-md-6 mt-4 mt-md-0">
          <h2 className="fw-bold mb-3">{product.title}</h2>
          <p className="text-muted">Category: {product.category}</p>
          <p>{product.description}</p>

          <div className="my-3">
            <h4 className="text-success fw-bold">₹{product.price}</h4>
            <span className="text-muted text-decoration-line-through me-2">
              ₹{(product.price * 1.4).toFixed(0)}
            </span>
            <span className="badge bg-danger">30% OFF</span>
          </div>

          {/* Quantity */}
          <div className="d-flex align-items-center mb-3">
            <label htmlFor="qty" className="form-label fw-semibold me-2">Quantity:</label>
            <input
              type="number"
              id="qty"
              className="form-control"
              style={{ width: "80px" }}
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          {/* Buttons */}
          <div className="d-flex gap-3 mt-4">
            <button className="btn btn-warning px-4" onClick={handleAddToCart}>
              <i className="fas fa-shopping-cart me-2"></i>Add to Cart
            </button>
            <button
              className="btn btn-outline-dark"
              onClick={() => navigate("/products")}
            >
              <i className="fas fa-arrow-left me-2"></i>Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
