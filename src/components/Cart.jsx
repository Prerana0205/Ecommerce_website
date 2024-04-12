import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('gpay');  
  const [hasCheckedOut, setHasCheckedOut] = useState(false);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    fetchCartItems();

    // Listen for 'cartUpdated' event to refresh cart items
    window.addEventListener('cartUpdated', fetchCartItems);

    return () => {
      // Cleanup: Remove event listener
      window.removeEventListener('cartUpdated', fetchCartItems);
    };

  }, []);

  useEffect(() => {
    if (hasCheckedOut) {
      // Clear cart items if checkout has occurred
      setCartItems([]);
      setIsCartLoaded(false);
    }
  }, [hasCheckedOut]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/user');
      setUser(response.data[0]);
      fetchCartItems(response.data[0]);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchCartItems = () => { 
    axios.get('http://localhost:3001/cart/items')
    .then(response => {
      setCartItems(response.data);
    })
    .catch(error => {
      console.error('Error fetching cart items:', error);
    });
    
  };
  const handleSubtractQuantity = (productId, quantity) => {
    updateQuantity(productId, quantity - 1);
  };

  const handleRemoveProduct = (productId) => {
    axios.delete(`http://localhost:3001/cart/remove/${productId}`)
      .then(response => {
        console.log(response.data.message);
        fetchCartItems(); // Refresh cart items after removal
      })
      .catch(error => {
        console.error('Error removing item from cart:', error);
      });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity > 0) {
      axios.put(`http://localhost:3001/cart/update/${productId}`, { quantity })
        .then(response => {
          console.log(response.data.message);
          fetchCartItems(); // Refresh cart items after update
        })
        .catch(error => {
          console.error('Error updating quantity:', error);
        });
    } else {
      handleRemoveProduct(productId);
    }
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    cartItems.forEach(item => {
      subtotal += item.price * item.quantity;
    });
    return subtotal;
  };

  const calculatesTotal = () => {
    return calculateSubtotal();
  };
  
  const handleCheckout =async () => {
    if (paymentMethod === 'cod') {
      try {
        let totalQuantity = 0;
        cartItems.forEach(item => {
          totalQuantity += item.quantity;
        });
        // Make a request to your server to store user information in the order table
        const response = await axios.post('http://localhost:3001/orders', {
          userId: user.user_id, // Replace with actual logged in user ID
          paymentMethod: paymentMethod,
          totalAmount:calculateSubtotal(),
          totalQuantity: totalQuantity, // Pass the total quantity
          cartItems: cartItems
        });
        console.log('Order placed successfully:', response.data);
        const orderId = response.data.order_id; // Assuming the response contains the order_id

    // Fetch cart items for the newly created order
        const cartResponse = await axios.get(`http://localhost:3001/cart/items?order_id=${orderId}`);
        const newCartItems = cartResponse.data;

    // Update state with new cart items
       setCartItems(newCartItems);

        // Optionally, you can redirect the user to a success page or show a success message
      } catch (error) {
        console.error('Error placing order:', error);
        // Handle error accordingly
      }
    } else {
      try {
        const response = await axios.post('http://localhost:3001/razorpay/orders', { amount: calculateSubtotal()});
        const { data } = response;
        const options = {
          key: 'rzp_test_qK6F0Vc7Ao1QcU', // Your Razorpay key ID
          amount: data.amount,
          currency: 'INR',
          name: 'E-wellness',
          description: 'Test Transaction',
          order_id: data.id,
          handler: function (response) {
            console.log('Razorpay payment successful:', response.razorpay_payment_id);
            // Optionally, you can redirect the user to a success page or show a success message
          },
          prefill: {
            name: 'John Doe',
            email: 'example@example.com',
            contact: '9999999999',
          },
          notes: {
            address: 'Razorpay Corporate Office',
          },
          theme: {
            color: '#F37254',
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } catch (error) {
        console.error('Error creating Razorpay order:', error);
        // Handle error accordingly
      }
    }
    
    // Clear cart items
    setHasCheckedOut(true);
    // Set hasCheckedOut to true to trigger a cart refresh
    setIsCartLoaded(false);
    // Clear cart items
  };
 

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };
  return (
    <>
      <Navbar />
        <section style={{ padding: '100px', margin: '10px'}}>
          <h2 style={{ color: 'black' }}>Shopping Cart</h2>
          {cartItems.length > 0 ? (          
          <div className="table-responsive">
          <table className="table align-items-center mb-0">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Image</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(carts =>(
                <tr key={carts.id}>
                  <td>{carts.product_name}</td>
                  <td><img src={`http://localhost:3001/uploads/products/`+ carts.image} alt={carts.product_name} style={{ width: '50px', height: '50px' }} /></td>
                  <td>
                  <button onClick={() => handleSubtractQuantity(carts.product_id, carts.quantity)}>-</button>
                      {carts.quantity}
                  <button onClick={() => updateQuantity(carts.product_id, carts.quantity + 1)}>+</button>
                  </td>
                  <td>{carts.amount}</td>
                  {/* Add other cells for additional information */}
                  <td>
                      <button onClick={() => handleRemoveProduct(carts.product_id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="total-cell"style={{ textAlign: 'right'}}><strong>Total:</strong></td>
                <td className="total-cell">{calculatesTotal()}</td>
              </tr>
            </tfoot>
          </table>
          </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
          <div className="checkout-section" style={{ position: 'absolute',backgroundColor: '#f0f0f0', bottom: 250, right: 400,padding: '20px', borderRadius: '10px' }}>
          <div className="payment-methods"style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontsize: '16px', color: '#333', cursor:'pointer', MarginRight: '20px' }}>
              <input
                type="radio"
                name="paymentMethod"
                value="gpay"
                checked={paymentMethod === 'gpay'}
                onChange={() => handlePaymentMethodChange('gpay')}
              />
              Google Pay
            </label>
            <label style={{ fontsize: '16px', color: '#333'}}>
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={() => handlePaymentMethodChange('cod')}
              />
              Cash on Delivery
            </label>
          </div>
          <button onClick={handleCheckout} style={{ marginTop: '30px',backgroundColor: '#007bff', color: '#ffffff',border: 'none', padding: '10px 30px', borderRadius: '5px', cursor: 'pointer'}}  >Checkout</button>
        </div>
        </section>
     
    </>
  )
}

export default Cart