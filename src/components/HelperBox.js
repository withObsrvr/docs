import React from 'react';
import styles from './HelperBox.module.css';

export default function HelperBox({ title, children, variant = 'default', icon }) {
  return (
    <div className={`${styles.helperBox} ${styles[variant]}`}>
      {icon && <div className={styles.icon}>{icon}</div>}
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
