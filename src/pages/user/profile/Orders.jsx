import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Orders.module.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const token = localStorage.getItem("userToken");
    try {
      const { data } = await axios.get("https://ecommerce-node4.onrender.com/order", {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setOrders(data.orders);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  const cancelOrder = async (orderId) => {
    const token = localStorage.getItem("userToken");
    try {
      await axios.patch(
        `https://ecommerce-node4.onrender.com/order/cancel/${orderId}`,
        {},
        {
          headers: { Authorization: `Tariq__${token}` },
        }
      );
      getOrders();
    } catch (error) {
      console.error("Failed to cancel order", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className={styles.ordersSection}>
      <h2 className={styles.sectionTitle}>Your Orders</h2>
      <div className={styles.ordersGrid}>
        {orders.map((order) => (
          <div className={styles.orderCard} key={order._id}>
            <h3 className={styles.orderId}>Order ID: {order._id}</h3>
            <p className={styles.status}>Status: {order.status}</p>
            <p>Address: {order.address}</p>
            <p>Phone: {order.phoneNumber}</p>
            <p>Total: {order.finalPrice}$</p>
            <p>Created: {new Date(order.createdAt).toLocaleString()}</p>
            <hr />
            {order.cartItems?.map((item) => (
              <div key={item._id} className={styles.item}>
                <img
                  className={styles.image}
                  src={item.product.mainImage.secure_url}
                  alt={item.product.name}
                />
                <div className={styles.itemInfo}>
                  <p><strong>{item.product.name}</strong></p>
                  <p>Price: ${item.price}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
            {order.status === "pending" && (
              <button
                className={styles.cancelBtn}
                onClick={() => cancelOrder(order._id)}
              >
                Cancel Order
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
