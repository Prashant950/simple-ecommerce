import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', form);
      localStorage.setItem('token', res.data.token);
      toast.success("Login successful!");
      navigate('/products');
    } catch (err) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login Page</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
          <button type="submit">Login</button>
          <p className="auth-link">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          <p className="auth-link">
            Forgot password? <Link to="/forgot-password">Reset here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
