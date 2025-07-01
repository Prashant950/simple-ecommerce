import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Button,
  Card,
  Container,
  Row,
  Col,
  Badge,
  Spinner,
} from "react-bootstrap";
import { getproducts } from "../components/ProductSlice";
import { addItem } from "../components/CartSlice";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getproducts());
  }, []);

  return (
    <>
      {/* Hero Banner */}
      <div
        className="hero-banner text-white d-flex flex-column align-items-center justify-content-center text-center mb-5"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1607082349566-187342b8aa64?auto=format&fit=crop&w=1500&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          borderRadius: "20px",
          position: "relative",
          overflow: "hidden",
          animation: "fadeIn 2s ease-in-out",
        }}
      >
        {/* Glass-like Gradient Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to top right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1))",
            backdropFilter: "blur(4px)",
            zIndex: 0,
            borderRadius: "20px",
          }}
        ></div>

        {/* Hero Content */}
        <div
          className="hero-content"
          style={{ position: "relative", zIndex: 2, padding: "0 15px" }}
        >
          <h1
            className="display-2 fw-bold mb-3 animate__animated animate__fadeInDown"
            style={{ fontFamily: "Poppins, sans-serif", letterSpacing: "1px" }}
          >
            Welcome to <span style={{ color: "#ffc107" }}>E-Marketplace</span>
          </h1>
          <p
            className="lead mb-4 animate__animated animate__fadeInUp"
            style={{ fontSize: "1.4rem", fontWeight: "300" }}
          >
            Shop Smart. Save Big. Explore millions of products from top brands.
          </p>

          {/* CTA Button */}
          <a
            href="/products"
            className="btn btn-light btn-lg px-5 py-3 mt-2 animate__animated animate__fadeInUp"
            style={{
              fontSize: "1.2rem",
              borderRadius: "30px",
              transition: "0.3s ease",
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontWeight: "600",
            }}
          >
            Start Shopping
          </a>
        </div>

        {/* Featured Sections */}
        <div
          className="container text-center mt-5 animate__animated animate__fadeInUp"
          style={{ zIndex: 2 }}
        >
          <div className="row g-4">
            <div className="col-md-4">
              <div className="bg-gradient bg-info text-white p-4 rounded-4 shadow h-100 hover-scale">
                <h4 className="fw-bold">✨ New Arrivals</h4>
                <p className="small">
                  Discover the latest collections and trending items every day!
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-gradient bg-warning text-white p-4 rounded-4 shadow h-100 hover-scale">
                <h4 className="fw-bold">🔥 Special Offers</h4>
                <p className="small">
                  Unwrap exclusive deals and time-limited discounts just for
                  you.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-gradient bg-danger text-white p-4 rounded-4 shadow h-100 hover-scale">
                <h4 className="fw-bold">🚚 Fast Delivery</h4>
                <p className="small">
                  Get lightning-fast delivery across the country. Shop without
                  delay!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Container className="mt-4">
        <h2 className="mb-4 text-center fw-bold">Top Trending Products</h2>

        {status === "loading" && (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        {status === "error" && (
          <Alert variant="danger">Failed to load products.</Alert>
        )}

        <Row>
          {data?.map((product, index) => (
            <Col
              md={6}
              lg={4}
              xl={3}
              className="mb-4"
              key={product._id || index}
            >
              <Card className="product-card h-100 shadow-sm">
                <div className="image-wrapper">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    className="product-img"
                  />
                  <Badge
                    bg="info"
                    className="position-absolute top-0 start-0 m-2"
                  >
                    New
                  </Badge>
                </div>
                <Card.Body className="text-center">
                  <h5 className="fw-bold">{product.title}</h5>
                  <div className="mb-2">
                    <span className="text-muted text-decoration-line-through me-2">
                      ₹{product.price}
                    </span>
                    <span className="fw-bold text-success">
                      ₹{product.price}
                    </span>
                    <Badge bg="warning" className="ms-2">
                      {Math.floor(Math.random() * 30 + 10)}% OFF
                    </Badge>
                  </div>
                  <div className="mb-3">
                    <span className="text-warning">⭐⭐⭐⭐☆</span>
                    <small className="text-muted"> (120+ reviews)</small>
                  </div>
                  <div className="d-flex justify-content-center gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => dispatch(addItem(product))}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="dark"
                      size="sm"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      View
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer/>
    </>
  );
};

export default Products;
