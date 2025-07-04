import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./ResetPassword.module.css";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.patch("https://ecommerce-node4.onrender.com/auth/forgotPassword", {
        email,
        password,
        code,
      });

      toast.success("Password has been reset successfully");
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reset Your Password</h2>
      <form onSubmit={handleResetPassword} className={styles.form}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          type="email"
          id="email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="code" className={styles.label}>Reset Code</label>
        <input
          type="text"
          id="code"
          className={styles.input}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <label htmlFor="password" className={styles.label}>New Password</label>
        <input
          type="password"
          id="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className={styles.button}>Update Password</button>
      </form>
    </div>
  );
}
