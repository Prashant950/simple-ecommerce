import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendOTP = async () => {
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/forgot-password', { email });
      setMessage(res.data.message);
      setTimeout(() => {
        navigate('/verify-otp', { state: { email } });
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error sending OTP');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Reset Your Password</h2>
        <p className="message">{message}</p>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button onClick={sendOTP} disabled={loading}>
          {loading ? 'Sending...' : 'Send OTP'}
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
