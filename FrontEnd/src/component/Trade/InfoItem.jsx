import React from "react";
import styles from './Stocksearch.module.css';

function InfoItem({ label, value}) {
  return (
    <>
      <h3 className={styles.infoLabel}>{label}</h3>
      <p className={styles.infoValue}>{value}</p>
    </>
  );
}

export default InfoItem;