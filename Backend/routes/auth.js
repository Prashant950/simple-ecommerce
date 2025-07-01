const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const User  = require('../models/User');
const router = express.Router();
const nodemailer = require('nodemailer');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Product = require('../models/Product'); // Import the model
const Order = require('../models/Order');
const Razorpay = require('razorpay');

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User  already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser  = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'User  registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser   = await User.findOne({ email });
    if (!existingUser  ) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("your token",token)

    res.json({ token, existingUser : { id: existingUser._id, name: existingUser.name, email: existingUser.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const User  = await User.findOne({ email });

    if (!User ) return res.status(404).json({ message: 'User  not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry

    User.otp = otp;
    User.otpExpiry = otpExpiry;
    await User .save();

    // ✅ Setup Gmail transporter using App Password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        User : 'your_email@gmail.com',
        pass: 'generated_16_char_app_password', // Use Gmail App Password here
      },
    });

    const mailOptions = {
      from: 'your_email@gmail.com',
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const User  = await User .findOne({ email });

    if (!User  || User .otp !== otp || User .otpExpiry < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    User .password = hashedPassword;
    User .otp = null;  // Clear OTP after successful reset
    User .otpExpiry = null;  // Clear OTP expiry
    await User .save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/logout', (req, res) => {
  // No token invalidation here unless using a token blacklist
  res.status(200).json({ message: 'User  logged out successfully' });
});



router.get('/products', async (req, res) => {
  try {
    const allProducts = await Product.find();  // Fetch all products
    res.status(200).json(allProducts);         // Send as JSON
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


// Create new order
router.post('/orders', async (req, res) => {
  try {
    const { user, items, total } = req.body;

    const order = new Order({ user, items, total });
    await order.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ message: 'Failed to place order', error: err.message });
  }
});

// Get all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// Get order by ID
router.get('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order', error: err.message });
  }
});


router.get('/user/orders', async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user is logged in and their ID is available
    const orders = await Order.find({ 'user._id': userId });

    if (!orders) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send('Error fetching orders');
  }
});



router.post('/saveuser', async (req, res) => {
  try {
    const { name, phone, address, pincode } = req.body;

    const newUser = new User({
      name,
      phone,
      address,
      pincode,
    });

    await newUser.save();
    res.status(201).json({ message: 'User saved successfully', user: newUser });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Razorpay Instance



const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,  // <--  KEY_ID
  key_secret: process.env.RAZORPAY_KEY_SECRET,      // <--  SECRET_KEY
});




// Create Razorpay Order
router.post('/create-order', async (req, res) => {
  try {
    const { totalAmount } = req.body;

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: "receipt_order_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).send("Error creating Razorpay order");
  }
});


// Checkout - Save order in DB
router.post('/checkout', async (req, res) => {
  try {
    const { user, items, total, paymentId, orderId, signature } = req.body;

    const newOrder = new Order({
      user: user,
      items: items,
      totalAmount: total,
      paymentDetails: {
        paymentId: paymentId,
        orderId: orderId,
        signature: signature,
        status: 'Paid',
        createdAt: new Date()
      },
      orderStatus: 'Paid',
      createdAt: new Date()
    });

    const savedOrder = await newOrder.save();

    res.status(200).json({ message: "Order saved successfully", order: savedOrder });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).send("Error saving order");
  }
});





router.get('/order/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId, 'user._id': req.user.id });

    if (!order) {
      return res.status(404).json({ message: 'Order not found or does not belong to user' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).send('Error fetching order details');
  }
});


module.exports = router;
