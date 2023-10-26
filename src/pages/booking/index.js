import React from "react";
import Link from "next/link";
import Form from "@/components/Form/Form";
import { useRouter } from "next/router";
import styles from "./Booking.module.css";
import useSWR from "swr";

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
      alert("Your Email has been sent");
      router.push("/");
    } else {
      alert("Something has gone wrong. Please try again.");
    }
  }
  return (
    <main className={`${styles.main}`}>
      <button>
        <Link href="./">
          {inEnglish ? "Back to Homepage" : "Zurück zur Startseite"}
        </Link>
      </button>
      <h4 className={`${styles.disclaimer}`}>
        {inEnglish
          ? `${textPartBeforeEmailLink.english}`
          : `${textPartBeforeEmailLink.deutsch}`}
      </h4>
      <a>booking-abdoui-ws@riseup.net</a>
      <h4>
        {inEnglish
          ? `${textPartAfterEmailLink.english}`
          : `${textPartAfterEmailLink.deutsch}`}
      </h4>
      <Form inEnglish={inEnglish} onSubmit={handleBookingRequest} />
    </main>
  );
}
