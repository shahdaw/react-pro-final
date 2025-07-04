import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';
import { CartContext } from '../../../components/user/context/CartContext.jsx';
import styles from './ProductDetails.module.css';

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { cartCount, setCartCount } = useContext(CartContext);

  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`https://ecommerce-node4.onrender.com/products/${productId}`);
      setProduct(data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addProductToCart = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        'https://ecommerce-node4.onrender.com/cart',
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );

      if (response.status === 201) {
        toast.info('Product added successfully', {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
          transition: Slide,
        });
        setCartCount(cartCount + 1);
        navigate('/cart');
      }

    } catch (error) {
      console.log("error", error);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");

    try {
      const response = await axios.post(
        `https://ecommerce-node4.onrender.com/products/${productId}/review`,
        { comment, rating },
        { headers: { Authorization: `Tariq__${token}` } }
      );

      if (response.data.message === "success") {
        toast.success("Rating added successfully ✨", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        setComment('');
        setRating(5);
        getProducts();
      }

    } catch (error) {
      toast.error("Failed to send rating ❌", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  
  if (isLoading) {
     return (
       <div className={styles.loaderContainer}>
         <div className={styles.spinner}></div>
       </div>
     );
   }

  return (
    <section className={styles.productSection}>
      <div className={styles.card}>
        <img src={product.mainImage?.secure_url} alt={product.name} className={styles.image} />

        <h2 className={styles.title}>{product.name}</h2>
        <p className={styles.description}>{product.description}</p>

        <div className={styles.centered}>
          <button onClick={addProductToCart} className={styles.addToCart}>Add to cart</button>
        </div>

        <form onSubmit={submitReview} className={styles.reviewForm}>
          <label> Your comment :</label>
          <textarea
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className={styles.input}
          />

          <label> Rating (1 to 5) :</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
            className={styles.input}
          />

          <div className={styles.centered}>
            <button type="submit" className={styles.submitReview}>Send rating</button>
          </div>
        </form>

        <div className={styles.reviewsSection}>
          <h3 className={styles.reviewsTitle}>Ratings :</h3>
          {product.reviews?.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index} className={styles.reviewCard}>
                <div className={styles.reviewRating}>
                  ⭐ {review.rating} / 5
                </div>
                <p>{review.comment}</p>
                <div className={styles.reviewFooter}>
               by : {review.createdBy?.userName || 'Anonymous user'} 
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noReviews}>There are no reviews yet</p>
          )}
        </div>
      </div>
    </section>
  );
}
