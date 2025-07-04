import React, { useContext } from 'react';
import { UserContext } from '../../../components/user/context/UserContext';
import styles from './Info.module.css';

export default function Info() {
  const { user, loading } = useContext(UserContext);

   if (loading) {
        return (
          <div className={styles.loaderContainer}>
            <div className={styles.spinner}></div>
          </div>
        );
      }

  return (
    <div className={styles.infoContainer}>
      <h2 className={styles.title}>Account Information</h2>
      <div className={styles.field}>
        <span className={styles.label}>Name:</span>
        <span className={styles.value}>{user.userName}</span>
      </div>
      <div className={styles.field}>
        <span className={styles.label}>Email:</span>
        <span className={styles.value}>{user.email}</span>
      </div>
    </div>
  );
}







