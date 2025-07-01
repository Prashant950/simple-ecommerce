const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    name: String,
    phone: String,
    address: String,
    pincode: String,
  },
  items: [
    {
      productId: Number,
      title: String,
      name: String,
      price: Number,
      image: String,
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  paymentDetails: {
    paymentId: String,
    orderId: String,
    signature: String,
    status: { 
      type: String, 
      enum: ["Paid", "Failed"], 
      default: "Paid" 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
  },
  orderStatus: {
    type: String,
    enum: ["Pending", "Paid", "Shipped", "Delivered"],
    default: "Pending",
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Order', orderSchema);
