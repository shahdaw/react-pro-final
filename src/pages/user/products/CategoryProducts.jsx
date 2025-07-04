import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './CategoryProducts.module.css';

export default function CategoryProducts() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`https://ecommerce-node4.onrender.com/products/category/${categoryId}`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [categoryId]);

  if (isLoading) {
     return (
       <div className={styles.loaderContainer}>
         <div className={styles.spinner}></div>
       </div>
     );
   }

  return (
    <section className={styles.productsSection}>
      <h2 className={styles.heading}>Products</h2>
      <div className={styles.productsGrid}>
        {products.map(product => (
          <div className={styles.productCard} key={product._id}>
            <img
              src={product.mainImage.secure_url}
              alt={product.name}
              className={styles.productImage}
            />
            <h3 className={styles.productName}>{product.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
