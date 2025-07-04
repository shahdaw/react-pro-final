import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UserContext } from '../../../components/user/context/UserContext';
import styles from './Image.module.css';

export default function Image() {
  const { register, handleSubmit } = useForm();
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const updateImage = async (data) => {
    const token = localStorage.getItem('userToken');
    const formData = new FormData();
    formData.append('image', data.image[0]);

    try {
      setIsLoading(true);
      const response = await axios.put(
        'https://ecommerce-node4.onrender.com/user/update-image',
        formData,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success('Image updated successfully');
      }
    } catch (err) {
      toast.error('Error updating image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImagePreview(URL.createObjectURL(file));
  };

  if (isLoading) {
      return (
        <div className={styles.loaderContainer}>
          <div className={styles.spinner}></div>
        </div>
      );
    }

  return (
    <form onSubmit={handleSubmit(updateImage)} className={styles.form}>
      <label className={styles.label}>Update Profile Picture</label>
      <input
        type="file"
        {...register('image')}
        onChange={handleImageChange}
        className={styles.input}
      />
      <div className={styles.imageWrapper}>
        <img
          src={imagePreview || user?.image?.secure_url}
          alt="Profile"
          className={styles.image}
        />
      </div>
      <button type="submit" className={styles.button}>
        Update
      </button>
    </form>
  );
}
