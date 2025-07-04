import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./CreateOrder.module.css";

const CreateOrder = () => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [couponName, setCouponName] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getCartItems = async () => {
    const token = localStorage.getItem("userToken");
    try {
      const response = await axios.get("https://ecommerce-node4.onrender.com/cart", {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setCartItems(response.data.products);
    } catch (err) {
      setError("Failed to load cart items");
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("userToken");
    try {
      await axios.post(
        "https://ecommerce-node4.onrender.com/order",
        { address, phone, couponName },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );

      navigate("/profile/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create order");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create New Order</h2>

      <ul className={styles.cartList}>
        {cartItems.map((item) => (
          <li key={item._id} className={styles.cartItem}>
            <div className={styles.productName}>{item.details.name}</div>
            <div className={styles.quantity}>Quantity: {item.quantity}</div>
          </li>
        ))}
      </ul>

      <form onSubmit={handleCreateOrder} className={styles.form}>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Coupon Name (Optional)"
          value={couponName}
          onChange={(e) => setCouponName(e.target.value)}
        />
        <button type="submit" className={styles.submitButton}>
          Send Order
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default CreateOrder;
