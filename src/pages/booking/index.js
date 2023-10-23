import React from "react";
import Link from "next/link";
import Form from "@/components/Form/Form";
import { useRouter } from "next/router";
import styles from "./Booking.module.css";

export default function BookingPage() {
  const router = useRouter();
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
        <Link href="./">Back</Link>
      </button>
      <h4 className={`${styles.disclaimer}`}>
        Questions, Feedback and Booking Requests to:
      </h4>
      <a>booking-abdoui-ws@riseup.net</a>
      <h4>or fill in the form below. Thank you for reaching out to me!</h4>
      <Form onSubmit={handleBookingRequest} />
    </main>
  );
}
