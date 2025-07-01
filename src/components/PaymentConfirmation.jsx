// src/components/PaymentConfirmation.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PaymentConfirmation = () => {
  const { orderId } = useParams();
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const response = await axios.post('/api/payment/complete', { orderId, paymentStatus: 'Success' });
        setPaymentStatus('Payment Successful');
      } catch (error) {
        setPaymentStatus('Payment Failed');
      }
    };

    confirmPayment();
  }, [orderId]);

  return (
    <div>
      <h2>{paymentStatus}</h2>
      {paymentStatus === 'Payment Successful' && (
        <p>Your order has been placed successfully. You can view it <a href={`/order-confirmation/${orderId}`}>here</a>.</p>
      )}
    </div>
  );
};

export default PaymentConfirmation;
