import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Dropdown from 'react-bootstrap/Dropdown';
import { UserContext } from '../context/UserContext';
import styles from './CustomNavbar.module.css';  
import shImage from '../../../assets/shahdLogo1.png';


export default function CustomNavbar() {
  const navigate = useNavigate();
  const { cartCount } = useContext(CartContext);
  const { user, loading, setUser } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem('userToken');
    setUser(null);
    navigate('/auth/login');
  };

  return (
    <Navbar expand="lg" className={styles.navbarCustom}>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-between">
          <Nav className={styles.navLeft}>
            <Nav.Link as={Link} to="/" className={styles.navLink}>Home</Nav.Link>
            <Nav.Link as={Link} to="/categories" className={styles.navLink}>Category</Nav.Link>
            <Nav.Link as={Link} to="/products" className={styles.navLink}>Products</Nav.Link>
          </Nav>

         <Navbar.Brand as={Link} to="/" className={styles.navbarBrand}>
  <img src={shImage} alt="Shahd Store Logo"  className={styles.logoImage} />
</Navbar.Brand>


          <Nav className={styles.navRight}>
            <Nav.Link as={Link} to="/cart" className={styles.navLink}>
              Cart
              <span className={styles.cartCount}>{cartCount}</span>
            </Nav.Link>

            <Dropdown align="end">
              <Dropdown.Toggle variant="link" className={styles.dropdownToggle}>
                Welcome {loading ? "..." : user?.userName}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
