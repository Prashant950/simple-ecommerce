import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Container,
  Form,
  Button,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaUserCircle,
  FaBoxOpen,
  FaSearch,
} from "react-icons/fa";
import { filterBySearch } from "../components/ProductSlice";
import './Auth.css'; 


function Navigation() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const cartCount = useSelector((state) => state.cart.length);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(filterBySearch(searchTerm));
  };

  return (
    <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm py-3">
      <Container fluid>
        {/* Brand Logo */}
        <Navbar.Brand
          as={Link}
          to="/products"
          className="fw-bold fs-3 text-primary d-flex align-items-center"
        >
          <FaBoxOpen className="me-2" /> ShopEase
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse
          id="navbarScroll"
          className="d-flex justify-content-between"
        >
          {/* Navigation Links */}
          <Nav className="me-4">
            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/orders">
              Orders
            </Nav.Link>
          </Nav>

          {/* Search Bar */}
          <Form 
  className="d-flex align-items-center mx-auto" 
  style={{ width: "50%", maxWidth: "500px" }} 
  onSubmit={handleSearch}
>
  <Form.Control
    type="search"
    placeholder="Search for products..."
    className="me-2 shadow-sm"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      height: '42px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      padding: '0 12px',
      fontSize: '15px',
       marginTop: '12px'
    }}
  />
  <Button 
    variant="dark"
    type="submit"
    className="shadow-sm"
    style={{
      height: '42px',
      borderRadius: '8px',
      padding: '0 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <FaSearch />
  </Button>
</Form>


          {/* Right Icons */}
          <Nav className="ms-auto d-flex align-items-center">
            {/* Cart */}
            <Nav.Link as={Link} to="/cart" className="position-relative me-3">
              <FaShoppingCart size={20} />
              <Badge
                pill
                bg="danger"
                className="position-absolute top-0 start-100 translate-middle"
              >
                {cartCount}
              </Badge>
            </Nav.Link>

            {/* User Profile - Top Right */}
            <NavDropdown
              title={<FaUserCircle size={24} />}
              id="user-dropdown"
              align="end"
              className="me-3"
            >
              <NavDropdown.Item as={Link} to="/login">
                Login
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
