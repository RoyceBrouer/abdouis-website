import React from "react";
import styles from "./Impressum.module.css";
import BackButton from "@/components/Buttons/BackButton";

export default function Impressum({ inEnglish }) {
  return (
    <main className={`${styles.main}`}>
      <BackButton inEnglish={inEnglish} />
      <h4>Impressum</h4>
      <p>Abdoui Mohamed</p>
      <p>booking-abdoui-ws@riseup.net</p>
      <p className={`${styles.impressumForWebsite}`}>Website</p>
      <p className={`${styles.impressumForWebsite}`}>Royce Brouër</p>
      <p className={`${styles.impressumForWebsite}`}>tipmehere@riseup.net</p>
    </main>
  );
}
