import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";
import './Auth.css'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      <Container>
        {/* Top Sections */}
        <Row className="mb-4">
          {/* About */}
          <Col md={3} sm={6}>
            <h5>About E-Marketplace</h5>
            <p>Your one-stop online shopping platform offering top deals across electronics, fashion, and more.</p>
          </Col>

          {/* Quick Links */}
          <Col md={3} sm={6}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/products" className="text-white text-decoration-none">Products</a></li>
              <li><a href="/cart" className="text-white text-decoration-none">Cart</a></li>
              <li><a href="/about" className="text-white text-decoration-none">About Us</a></li>
              <li><a href="/contact" className="text-white text-decoration-none">Contact</a></li>
            </ul>
          </Col>

          {/* Customer Support */}
          <Col md={3} sm={6}>
            <h5>Customer Support</h5>
            <ul className="list-unstyled">
              <li><a href="/help" className="text-white text-decoration-none">Help Center</a></li>
              <li><a href="/returns" className="text-white text-decoration-none">Returns</a></li>
              <li><a href="/shipping" className="text-white text-decoration-none">Shipping Info</a></li>
              <li><a href="/faq" className="text-white text-decoration-none">FAQs</a></li>
            </ul>
          </Col>

          {/* Newsletter */}
          <Col md={3} sm={6}>
            <h5>Newsletter</h5>
            <p>Subscribe to get latest updates and offers.</p>
            <Form className="d-flex">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                className="me-2"
              />
              <Button variant="primary" type="submit">Subscribe</Button>
            </Form>
          </Col>
        </Row>

        {/* Middle Sections */}
        <Row className="mb-3 justify-content-between align-items-center">
          {/* Social Media */}
          <Col md={6} className="mb-3 mb-md-0">
            <h6>Follow Us</h6>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white">
                <FaFacebook size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white">
                <FaInstagram size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-white">
                <FaTwitter size={24} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-white">
                <FaYoutube size={24} />
              </a>
            </div>
          </Col>

          {/* Payment Options */}
          <Col md={6} className="text-md-end">
            <h6>We Accept</h6>
            <div className="d-flex justify-content-md-end gap-3">
              <FaCcVisa size={36} />
              <FaCcMastercard size={36} />
              <FaCcPaypal size={36} />
            </div>
          </Col>
        </Row>

        {/* Bottom Section */}
        <hr className="border-light" />
        <p className="text-center small mb-0">
          &copy; {currentYear} E-Marketplace. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
