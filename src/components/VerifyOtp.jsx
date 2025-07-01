import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './Auth.css';

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const email = location.state?.email;  // Get the email passed from ForgotPassword page
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const verifyOTP = async () => {
    if (newPassword !== confirmPassword) {
      return setMessage('Passwords do not match!');
    }
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/reset-password', {
        email,
        otp,
        newPassword
      });
      setMessage(res.data.message);
      setTimeout(() => {
        navigate('/login');  // Redirect to login page after successful reset
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error verifying OTP or resetting password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Verify OTP and Reset Password</h2>
        <p className="message">{message}</p>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button onClick={verifyOTP} disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </div>
    </div>
  );
}

export default VerifyOtp;
