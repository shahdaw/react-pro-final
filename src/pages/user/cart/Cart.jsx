import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styles from './Cart.module.css';
import { FaTrashAlt } from "react-icons/fa";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getCart = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get("https://ecommerce-node4.onrender.com/cart", {
        headers: {
          Authorization: `Tariq__${token}`,
        }
      });
      setCart(response.data.products);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  const incQty = async (productId) => {
    const token = localStorage.getItem("userToken");
    await axios.patch("https://ecommerce-node4.onrender.com/cart/incraseQuantity",
      { productId },
      { headers: { Authorization: `Tariq__${token}` } }
    );
    setCart(prev => prev.map(item =>
      item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decQty = async (productId) => {
    const token = localStorage.getItem("userToken");
    await axios.patch("https://ecommerce-node4.onrender.com/cart/decraseQuantity",
      { productId },
      { headers: { Authorization: `Tariq__${token}` } }
    );
    setCart(prev => prev.map(item =>
      item.productId === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const removeItem = async (productId) => {
    const token = localStorage.getItem("userToken");
    try {
      const response = await axios.patch(
        "https://ecommerce-node4.onrender.com/cart/removeItem",
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      if (response.data.message === "success") {
        getCart();
      }
    } catch (error) {
      console.error("Failed to remove product from cart", error);
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem("userToken");
    try {
      const response = await axios.patch(
        "https://ecommerce-node4.onrender.com/cart/clear",
        {},
        { headers: { Authorization: `Tariq__${token}` } }
      );
      if (response.data.message === "success") {
        getCart();
        console.log("The cart has been successfully deleted");
      }
    } catch (error) {
      console.error("Failed to clear cart", error);
    }
  };

  return (
    <section className={styles.cartSection}>
      <h2 className={styles.heading}>Your Cart</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item =>
            <tr key={item._id}>
              <td>
                <img className={styles.productImage} src={item.details.mainImage.secure_url} alt="Product" />
              </td>
              <td>{item.details.name}</td>
              <td>{item.details.finalPrice}$</td>
              <td>
                <div className={styles.qtyControls}>
                  <button className={styles.actionBtn} onClick={() => decQty(item.productId)}>-</button>
                  {item.quantity}
                  <button className={styles.actionBtn} onClick={() => incQty(item.productId)}>+</button>
                </div>
              </td>
              <td>{item.quantity * item.details.finalPrice}$</td>
              <td>
                <button className={styles.actionBtn} onClick={() => removeItem(item.productId)}><FaTrashAlt /></button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className={styles.centerActions}>
        <button className={styles.clearBtn} onClick={clearCart}>Clear cart</button>
        {cart.length > 0 && (
          <button className={styles.orderBtn} onClick={() => navigate("/create-order")}>
            Create order
          </button>
        )}
      </div>
    </section>
  );
}
