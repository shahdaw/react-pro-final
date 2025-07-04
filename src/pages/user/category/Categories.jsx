import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Categories.module.css';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`https://ecommerce-node4.onrender.com/categories/active`);
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (isLoading) {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
}


  return (
    <section className={styles.categoriesSection}>
      <h2 className={styles.title}>Our Categories</h2>
      <div className={styles.grid}>
        {categories.map((category) => (
          <Link to={`/categories/${category._id}`} key={category._id} className={styles.card}>
            <img src={category.image.secure_url} alt={category.name} className={styles.image} />
            <h3 className={styles.name}>{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
