import React from "react";
import styles from "./toggleLanguageButton.module.css";

export default function ToggleLanguageButton({ inEnglish, onToggleLanguage }) {
  return (
    <button
      className={`${styles.toggleButton}`}
      type="button"
      onClick={() => onToggleLanguage(inEnglish)}
    >
      {inEnglish ? "Website auf Deutsch" : "Website in English"}
    </button>
  );
}
