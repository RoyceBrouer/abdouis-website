import React from "react";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";
import { useRouter } from "next/router";
import styles from "./Booking.module.css";
import useSWR from "swr";
import BackButton from "@/components/Buttons/BackButton";

export default function BookingPage({ inEnglish }) {
  const router = useRouter();

  const { data: textsnippets, isLoading } = useSWR("/api/textsnippets/");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!textsnippets) {
    return <h1>refresh</h1>;
  }
  const textPartBeforeEmailLink = textsnippets.find(
    (textsnippet) => textsnippet.matter === "bookingSiteBeforeEmail"
  );
  const textPartAfterEmailLink = textsnippets.find(
    (textsnippet) => textsnippet.matter === "bookingSiteAfterEmail"
  );

  async function handleBookingRequest(formData) {
    const response = await fetch("/api/booking/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formData }),
    });

    if (response.ok) {
      alert(
        inEnglish
          ? "Your Email has been sent"
          : "Ihre Nachricht wurde erfolgreich versendet!"
      );
      router.push("/");
    } else {
      alert(
        inEnglish
          ? "Something has gone wrong. Please try again or send me an Email."
          : "Da ist leider etwas schiefgegangen. Bitte versuche es erneut oder schreibe an meine Emailadresse s.o."
      );
    }
  }
  return (
    <main className={`${styles.main}`}>
      <BackButton inEnglish={inEnglish} />
      <div className={`${styles.disclaimerContainer}`}>
        <h4 className={`${styles.disclaimer}`}>
          {inEnglish
            ? `${textPartBeforeEmailLink.english}`
            : `${textPartBeforeEmailLink.deutsch}`}
        </h4>
        <a className={`${styles.emailAdress}`}>booking-abdoui-ws@riseup.net</a>
        <h4 className={`${styles.disclaimer}`}>
          {inEnglish
            ? `${textPartAfterEmailLink.english}`
            : `${textPartAfterEmailLink.deutsch}`}
        </h4>
      </div>
      <BookingForm inEnglish={inEnglish} onSubmit={handleBookingRequest} />
    </main>
  );
}
