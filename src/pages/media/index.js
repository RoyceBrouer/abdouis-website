import React from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import styles from "./MediaPage.module.css";
import BackButton from "@/components/Buttons/BackButton";

export default function MediaPage({ inEnglish }) {
  const { data: images, isLoading } = useSWR(`/api/images`);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (!images) {
    return <h4>sorry, page cannot be loaded</h4>;
  }

  const instaIcon = images.find(
    (image) => image.filename === "instagram_idrgtl"
  );
  const spotifyIcon = images.find(
    (image) => image.filename === "spotify_tiooae"
  );

  return (
    <main className={`${styles.main}`}>
      <BackButton inEnglish={inEnglish} />
      <div className={`${styles.iconContainer}`}>
        <Link href="https.instagram.com" className={`${styles.instaLink}`}>
          <Image alt="Instagram" src={instaIcon.url} width="100" height="100" />
        </Link>
        <Link href="https.spotify.com" className={`${styles.spotifyLink}`}>
          <Image
            alt="Instagram"
            src={spotifyIcon.url}
            width="100"
            height="100"
          />
        </Link>
      </div>
      ;
    </main>
  );
}
