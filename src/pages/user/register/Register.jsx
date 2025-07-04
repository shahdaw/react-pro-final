import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Slide, toast } from 'react-toastify';
import styles from './Register.module.css'; 
import Button from 'react-bootstrap/Button';

export default function Register() {
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const registerUser = async (value) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`https://ecommerce-node4.onrender.com/auth/signup`, value);
      if (response.status === 201) {
        toast.info('Please check your email', {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
          transition: Slide,
        });
        navigate('/auth/login');
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setServerError("Email already in use");
      } else {
        setServerError("Server error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formCard} onSubmit={handleSubmit(registerUser)}>
        <h2 className={styles.title}>Create an Account</h2>
      

        {serverError && <div className="text-danger">{serverError}</div>}

        <label>User Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          {...register("userName", { required: "Username is required" })}
        />
        {errors.userName && <div className="text-danger">{errors.userName.message}</div>}

        <label>Email address</label>
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <div className="text-danger">{errors.email.message}</div>}

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <div className="text-danger">{errors.password.message}</div>}

        <button type="submit" className={styles.btn} disabled={isLoading}>
          {isLoading ? "Loading..." : "Create Account"}
        </button>

        <p className={styles.footerText}>
          Already have an account?
           <Link to="/auth/login" className={styles.links} >Sign In</Link>
        </p>
      </form>
    </div>
  );
}
