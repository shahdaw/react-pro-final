import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './ForgotPassword.module.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const sendCode = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        'https://ecommerce-node4.onrender.com/auth/sendcode',
        { email }
      );

      toast.success('Reset code sent to your email');
      navigate('/auth/reset-password');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Forgot Password</h2>
      <form onSubmit={sendCode} className={styles.form}>
        <label htmlFor="email" className={styles.label}>Email Address</label>
        <input
          type="email"
          id="email"
          placeholder="example@gmail.com"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>Send Code</button>
      </form>
    </div>
  );
}
