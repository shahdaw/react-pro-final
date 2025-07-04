import React from 'react';
import Category from '../../../components/user/category/Category';
import styles from './Home.module.css'; 


export default function Home() {
  return (
    <>
      <div className={styles.flowerImg}>
        <div className={styles.overlay}>
          <h1 className={styles.title}>Shahd Store</h1>
          <p className={styles.subtitle}>
            Discover beautiful products at the best prices – enjoy a delightful shopping experience!
          </p>
        </div>
      </div>

      <div className="container my-5">
        <Category />
      </div>
    </>
  );
}

