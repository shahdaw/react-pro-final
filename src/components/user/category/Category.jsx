import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import styles from './Category.module.css'; 

export default function Category() {
  const [categories, setCategories] = useState([{}]);
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
  }

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
    <div className={styles.container}>
      <h2 className={styles.heading}>Our Categories</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        navigation
        loop={true}
        slidesPerView={3.3}
      >
        {categories.map(category => (
          <SwiperSlide key={category._id}>
            <img src={category?.image?.secure_url} alt={category.name} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
