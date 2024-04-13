import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/user')
    .then(response => {
      setUser(response.data[0]);
      setIsAuthenticated(true);
    })
    .catch(error => {
      setIsAuthenticated(false);
      console.error('Error fetching user data:', error);
    });
    
    // Fetch products data from the server
    axios.get('http://localhost:3001/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });

    // Fetch categories data from the server
    axios.get('http://localhost:3001/category')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching category:', error);
      });
  }, []);

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category_name === selectedCategory);


  const generateOrderId = () => {
      const timestamp = Date.now().toString(36);
      const randomChars = Math.random().toString(36).substr(2, 5);
      return timestamp + randomChars;
  };

 const addToCart = (productId, price) => {
  const quantity = 1;
  if (isAuthenticated) {
    const orderId = generateOrderId();
    axios.post('http://localhost:3001/cart/add', { userId: user.user_id, productId, price, quantity, orderId })
      .then(response => {
        console.log('Product added to cart:', response.data);
        window.dispatchEvent(new Event('cartUpdated'));
      })
      .catch(error => {
        console.error('Error adding product to cart:', error);
      });
  } else {
    // Redirect to sign-up page if user is not logged in
    navigate('/signup');
  }
};


  return (
    <>
      <section id="portfolio" className="portfolio">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Product</h2>
            <p>Check our Product</p>
          </div>
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-center">
              <ul id="portfolio-flters">
                <li
                  onClick={() => handleCategoryChange('All')}
                  className={selectedCategory === 'All' ? 'filter-active' : ''}
                >
                  All
                </li>
                {categories.map(category => (
                  <li
                    key={category.category_id}
                    onClick={() => handleCategoryChange(category.category_name)}
                    className={selectedCategory === category.category_name ? 'filter-active' : ''}
                  >
                    {category.category_name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="row">
            {filteredProducts.map(product => (
              <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100" key={product.product_id}>
                <div className="card">
                  <img src={`http://localhost:3001/uploads/products/${product.image}`} alt="" />
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4>{product.product_name}</h4>
                        <h2><span>&#x20B9;{product.price}</span></h2>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      {isAuthenticated ? (
                        <img src="../assets/img/download.png" alt="Order" className="btn-img" style={{ cursor: 'pointer', Width: '40px', height: '40px'}} onClick={() => addToCart(product.product_id, product.price)} />
                        ):(
                        <img src="../assets/img/download.png" alt="Order" className="btn-img" style={{ cursor: 'pointer', Width: '40px', height: '40px'}} />
                      )}  
                      <i className="bi bi-heart" style={{ color: 'black', cursor: 'pointer', fontSize: '1.7rem', marginRight: '10px' }} ></i>
                      <i className="bi bi-link" style={{ color: 'black', cursor: 'pointer', fontSize: '1.7rem', marginRight: '10px' }} ></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
