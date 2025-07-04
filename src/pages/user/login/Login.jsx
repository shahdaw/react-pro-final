import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { Link } from "react-router-dom";
import styles from './Login.module.css';

export default function Login() {
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const registerUser = async (value) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`https://ecommerce-node4.onrender.com/auth/signin`, value);
      if (response.status === 200) {
        localStorage.setItem("userToken", response.data.token);
        navigate('/');
      }
    } catch (error) {
      setServerError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Form className={styles.card} onSubmit={handleSubmit(registerUser)}>
        <h2 className={styles.title}>Sign in</h2>
        

        {serverError && <div className="text-danger">{serverError}</div>}

        <Form.Group className={styles.formGroup} controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Your Email"
            {...register("email", { required: "email is required" })}
          />
          {errors.email && <div className="text-danger">{errors.email.message}</div>}
        </Form.Group>

        <Form.Group className={styles.formGroup} controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Your Password"
            {...register("password", { required: "password is required" })}
          />
          {errors.password && <div className="text-danger">{errors.password.message}</div>}
        </Form.Group>

        <button type='submit' className={styles.submitBtn} disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign In"}
        </button>

        <div className={styles.links}>
          <p>
            Forgot your password?
            <Link to="/auth/forgot-password"> Reset Password</Link>
          </p>
          <p>
            Don’t have an account?
            <Link to="/auth/register"> Create an Account</Link>
          </p>
        </div>
      </Form>
    </div>
  );
}
