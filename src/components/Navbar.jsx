import React, { useState, useEffect} from 'react';
import { Link, useNavigate} from 'react-router-dom'
import userImage from '../user.png';
import cartImage from '../cart.png';
import axios from 'axios';
const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const userNameFromStorage = localStorage.getItem('userName');
    if (userNameFromStorage) {
      setIsAuthenticated(true);
      setUserName(userNameFromStorage);
      fetchCartItemCount();
    }
    else {
      setIsAuthenticated(false); // If not authenticated, reset state
      setUserName("");
      setCartItemCount(0);
    }
    
  }, []);
  useEffect(() => {
    // Update cart item count whenever cartItemCount state changes
    fetchCartItemCount();
  }, []);
  const handleLogout = () => {
    // Clear user authentication and remove user's name from localStorage
    setIsAuthenticated(false);
    setUserName("");
    localStorage.removeItem('userName');
    setCartItemCount(0);
    // Redirect to login page or another appropriate page
    navigate('/');
  };

  const fetchCartItemCount = () => {
    axios.get('http://localhost:3001/cart')
      .then(response => {
        setCartItemCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
  };

  return (
    <>
     <header id="header" class="fixed-top ">
        <div class="container d-flex align-items-center justify-content-between">
            <h1 class="logo"><a href="index.html">E-Wellness</a></h1>
            <nav id="navbar" class="navbar">
                <ul>
                    <li><a class="nav-link scrollto active" href="/#hero">Home</a></li>
                    <li><a class="nav-link scrollto" href="/#about">About Us</a></li>
                    <li><a class="nav-link scrollto " href="/#portfolio">Products</a></li>
                    <li><a class="nav-link scrollto" href="/#team">Blog</a></li>
                    <li><a class="nav-link scrollto" href="/#contact">Contact</a></li>
                </ul>
                <i class="bi bi-list mobile-nav-toggle"></i>
          </nav>
          <Link to="/Cart" style={{ position: 'relative' }}>
          <img src={cartImage} width="50" height="50" alt="Cart" /><span style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'red', color: 'white', borderRadius: '50%', padding: '5px 8px', fontSize: '12px' }}>0</span>
            {cartItemCount > 0 && (
              <span style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'red', color: 'white', borderRadius: '50%', padding: '5px 8px', fontSize: '12px' }}>
                {cartItemCount}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
               <div className="dropdown">
               <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                 <img src={userImage} width="30" height="30" alt="User" /> {userName}
               </button>
               <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                 <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
               </ul>
             </div>
          ) : (
            <Link to="/signup"><img src={userImage} width="30" height="30" alt="User" /> Sign Up</Link>
          )}
        </div>
      </header>
    </>
  )
}

export default Navbar