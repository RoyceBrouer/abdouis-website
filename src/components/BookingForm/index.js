import React from "react";
import styles from "./BookingForm.module.css";

export default function Form({ onSubmit, inEnglish }) {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
    event.target.reset();
  }
  return (
    <div className={`${styles.formContainer}`}>
      <form action="royce@posteo.org" method="post" onSubmit={handleSubmit}>
        <div className={`${styles.gradientWrapper}`}>
          <fieldset className={`${styles.infoFieldset}`}>
            <h4>
              {inEnglish ? "Your Contact Information" : "Ihre Kontaktdaten"}
            </h4>
            <label htmlFor="firstName">
              {inEnglish ? "First Name:" : "Vorname:"}
            </label>
            <input
              id="firstName"
              name="firstName"
              placeholder="First Name"
              type="text"
              required
            />
            <br />
            <label htmlFor="lastName">
              {inEnglish ? "Last Name:" : "Nachname:"}
            </label>
            <input
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              type="text"
              required
            />
            <br />
            <label htmlFor="email">E-mail:</label>
            <input
              id="email"
              name="email"
              placeholder="Your Email-Adress"
              type="text"
              required
            />
          </fieldset>

          <fieldset className={`${styles.infoFieldset}`}>
            <h4>
              {inEnglish ? "Your Message for Me" : "Ihre Nachricht an mich"}
            </h4>
            <textarea
              id="message"
              name="message"
              placeholder="Your Message for me"
              rows="20"
              cols="auto"
              required
            />
          </fieldset>
          <button className={`${styles.submitButton}`}>
            {inEnglish ? "Submit" : "Versenden"}
          </button>
        </div>
      </form>
    </div>
  );
}
