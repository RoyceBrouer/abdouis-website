import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function index() {
  return (
    <nav className={`${styles.footer}`}>
      <Link href="/impressum">Impressum</Link>
    </nav>
  );
}
