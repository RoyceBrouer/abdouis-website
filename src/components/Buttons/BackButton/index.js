import React from "react";
import Link from "next/link";
import styles from "./BackButton.module.css";

export default function BackButton({ inEnglish }) {
  return (
    <Link href="./">
      <button type="button" className={`${styles.backButton}`}>
        {inEnglish ? "Back to Homepage" : "Zurück zur Startseite"}
      </button>
    </Link>
  );
}
