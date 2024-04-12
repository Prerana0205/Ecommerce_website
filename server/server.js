// server.js

const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const Razorpay = require('razorpay');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const razorpay = new Razorpay({
  key_id: 'rzp_test_qK6F0Vc7Ao1QcU', // Replace with your actual Razorpay key ID
  key_secret: 'lVo2dy64X4fvrvwJeDqS7ILI', // Replace with your actual Razorpay key secret
});


app.use(express.static('public'));
app.use('/uploads/banners', express.static(path.join(__dirname, 'uploads/banners')));
app.use('/uploads/products', express.static(path.join(__dirname, 'uploads/products')));

const bannerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/banners');
  },
  filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'BannerImages-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: bannerStorage });

const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/products');
  },
  filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'ProductImages-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload_1 = multer({ storage: productStorage });

// Create MySQL connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    port: '3307', // Replace with your MySQL host
    user: 'root', // Replace with your MySQL username
    password: '', // Replace with your MySQL password
    database: 'E-wellness'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Create a route to handle adding banners
app.post('/banners', upload.single('bannerImage'),(req, res) => {
    const { bannerName , status} = req.body;
    const bannerImage = req.file.filename;
  // Insert banner data into the database
  const INSERT_BANNER_QUERY = `INSERT INTO banners (title, image, status) VALUES (?, ?, ?)`;
  db.query(INSERT_BANNER_QUERY, [bannerName, bannerImage, status], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error adding banner');
    } else {
      res.status(200).send('Banner added successfully');
    }
  });
});

app.get('/', (req, res) => {
  // Query your database to fetch banner data
  db.query('SELECT * FROM banners', (err, results) => {
    if (err) {
      console.error('Error fetching banners:', err);
      res.status(500).send('Error fetching banners');
    } else {
      res.json(results); // Send the banner data as JSON response
    }
  });
});

app.delete('/banners/:id', (req, res) => {
  const bannerId = req.params.id;

  // Delete the banner from the database
  const DELETE_BANNER_QUERY = 'DELETE FROM banners WHERE banner_id = ?';
  db.query(DELETE_BANNER_QUERY, [bannerId], (err, result) => {
    if (err) {
      console.error('Error deleting banner:', err);
      res.status(500).send('Error deleting banner');
    } else {
      res.status(200).send('Banner deleted successfully');
    }
  });
});


app.get('/category', (req, res) => {
  const query = 'SELECT * FROM category';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching category:', error);
      res.status(500).json({ error: 'Error fetching category' });
      return;
    }
    res.json(results);
  });
});

app.post('/category_data',(req, res)=>{
  const {categoryName}= req.body;
  const query = 'INSERT INTO category (category_name) VALUES (?)';
  db.query(query,[categoryName],(err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error adding category');
    } else {
      res.status(200).send('category added successfully');
    }
  });

});
//create insert query for Product
app.post('/product', upload_1.single('productImage'),(req, res) => {
  const { productName,description , quantity, units, brand,price, category_Id, status} = req.body;
  const productImage = req.file.filename;
// Insert banner data into the database
const INSERT_BANNER_QUERY = `INSERT INTO products (product_name, description,image, price,quantity,units,brand,category_id,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)`;
db.query(INSERT_BANNER_QUERY, [productName, description,productImage, price,quantity, units, brand, category_Id, status], (err, result) => {
  if (err) {
    console.log(err);
    res.status(500).send('Error adding banner');
  } else {
    res.status(200).send('Product added successfully');
  }
});
});

app.get('/products', (req, res) => {
  const query = `
      SELECT products.*, category.category_name
      FROM products
      INNER JOIN category ON products.category_id = category.category_id
  `;

  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching products:', err);
          res.status(500).send('Error fetching products');
      } else {
          res.json(results);
      }
  });
});

app.delete('/products/:id', (req, res) => {
  const bannerId = req.params.id;

  // Delete the banner from the database
  const DELETE_BANNER_QUERY = 'DELETE FROM products WHERE banner_id = ?';
  db.query(DELETE_BANNER_QUERY, [bannerId], (err, result) => {
    if (err) {
      console.error('Error deleting banner:', err);
      res.status(500).send('Error deleting Product');
    } else {
      res.status(200).send('Product deleted successfully');
    }
  });
});

app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 8);

    // Perform validation if necessary
    db.query(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, hashedPassword],
      (error, result) => {
        if (error) {
          console.error('Error adding users:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json({ message: 'User added successfully' });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Query to retrieve the hashed password and name for the provided email
  const query = `SELECT * FROM users WHERE email = ?`;

  db.query(query, [email], async (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    if (result.length === 0) {
      // User not found
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Retrieve hashed password and name from the database
    const { password: hashedPasswordFromDB, name } = result[0];

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, hashedPasswordFromDB);

    if (isPasswordValid) {
      // Authentication successful, return the user's name
      return res.json({ success: true, message: 'Login successful', name });
    } else {
      // Invalid credentials
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

app.post('/cart/add', (req, res) => {
  const {userId, productId, price, quantity,orderId } = req.body;
  const amount = price * quantity;
  // Check if the product exists in the products table
  const checkQuery = 'SELECT COUNT(*) AS productCount FROM products WHERE product_id = ?';
  db.query(checkQuery, [productId], (checkError, checkResults) => {
    if (checkError) {
      console.error('Error checking product existence:', checkError);
      res.status(500).send('Internal server error');
    } else {
      const productCount = checkResults[0].productCount;
      if (productCount === 0) {
        // Product does not exist, return an error
        res.status(404).json({ message: 'Product not found' });
      } else {
        // Product exists, proceed with adding it to the cart
        const query = 'INSERT INTO carts (user_id,product_id, price, quantity,amount,order_id) VALUES (?,?, ?, ?,?,?)';
        db.query(query, [userId,productId, price, quantity, amount, orderId], (error, results) => {
          if (error) {
            console.error('Error adding product to cart:', error);
            res.status(500).send('Internal server error');
          } else {
            res.json({ message: 'Product added to cart successfully' });
          }
        });
      }
    }
  });
});

app.get('/cart', (req, res) => {
  const query = 'SELECT COUNT(*) AS count FROM carts';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching cart count:', error);
      res.status(500).send('Internal server error');
    } else {
      res.json(results[0]);
    }
  });
});

app.get('/user', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Error fetching category' });
      return;
    }
    res.json(results);
  });
});

app.get('/cart/items', (req, res) => {
  const { order_id } = req.query;
  let query = `
    SELECT carts.product_id, products.product_name, products.image, carts.quantity, carts.price, carts.amount
    FROM carts
    INNER JOIN products ON carts.product_id = products.product_id`;
  
  if (order_id) {
    query += ` WHERE carts.order_id = ${order_id}`;
  }
  
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching cart items:', error);
      res.status(500).send('Internal server error');
    } else {
      res.json(results);
    }
  });
});


app.put('/cart/update/:productId', (req, res) => {
  const productId = req.params.productId;
  const { quantity } = req.body;

  // Fetch the price of the product from the database
  const getPriceQuery = `SELECT price FROM products WHERE product_id = ${productId}`;
  db.query(getPriceQuery, (error, results) => {
    if (error) {
      console.error('Error fetching product price:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Calculate the total amount based on the new quantity
      const price = results[0].price;
      const amount = price * quantity;

      // Update the quantity and amount in the cart table
      const updateQuery = `UPDATE carts SET quantity = ${quantity}, amount = ${amount} WHERE product_id = ${productId}`;
      db.query(updateQuery, (error, results) => {
        if (error) {
          console.error('Error updating quantity and amount:', error);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.status(200).json({ message: 'Quantity and amount updated successfully' });
        }
      });
    }
  });
});

app.delete('/cart/remove/:productId', (req, res) => {
  const productId = req.params.productId;

  const query = `DELETE FROM carts WHERE product_id = ${productId}`;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error removing item from cart:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Item removed from cart successfully' });
    }
  });
});

app.post('/razorpay/orders', async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // amount in paise
    currency: 'INR',
    receipt: 'receipt_order_74394', // Replace with your own receipt ID
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to handle cash on delivery orders
app.post('/orders', (req, res) => {
  // Extract data from request body
  const { userId, paymentMethod, totalAmount,totalQuantity} = req.body;

  // Check if the user exists
  db.query('SELECT * FROM users WHERE user_id = ?', [userId], (userError, userResults) => {
    if (userError) {
      console.error('Error checking user existence:', userError);
      return res.status(500).json({ error: 'Error checking user existence' });
    }

    // If user does not exist, return an error
    if (userResults.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Insert into orders table
    const query = 'INSERT INTO orders (user_id, payment_method, total_amount,quantity) VALUES (?, ?, ?,?)';
    const values = [userId, paymentMethod, totalAmount,totalQuantity];

    db.query(query, values, (orderError, orderResults) => {
      if (orderError) {
        console.error('Error inserting order:', orderError);
        return res.status(500).json({ error: 'Error placing order' });
      }

      console.log('Order placed successfully:', { userId, paymentMethod, totalAmount});
      res.json({ message: 'Cash on delivery order placed successfully' });
    });
  });
});
app.get('/order', (req, res) => {
  const query = `
  SELECT orders.user_id, users.name, users.email
  FROM orders
  LEFT JOIN users ON orders.user_id = users.user_id
  GROUP BY orders.user_id, users.name, users.email;
  
`;
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching cart items:', error);
      res.status(500).send('Internal server error');
    } else {
      res.json(results);
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
