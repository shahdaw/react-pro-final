import React from 'react';
import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faSnapchatGhost } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.title}>Shahd Store</p>
        <p className={styles.text}>Thank you for visiting our store 🌸</p>

       
        <div className={styles.social}>
          <a href="#">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faSnapchatGhost} />
          </a>
        </div>

        <p className={styles.copy}>© 2025. Shahd Store. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

