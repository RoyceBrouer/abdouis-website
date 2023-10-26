import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <nav className={`${styles.footer}`}>
      <Link className={`${styles.link}`} href="/impressum">
        Impressum
      </Link>
    </nav>
  );
}
