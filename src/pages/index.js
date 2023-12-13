import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
// import Button from "@/components/Buttons";
import HomepageHeader from "@/components/HomepageHeader/";
import useSWR from "swr";
import { useState } from "react";
import { useEffect } from "react";
import Quote from "@/components/Quote";
import ToggleLanguageButton from "@/components/Buttons/ToggleLanguageButton";

export default function Home({ inEnglish, handleToggleLanguage }) {
  const { data: images, isLoading } = useSWR("/api/homeimages");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex === images?.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex((currentIndex) => currentIndex + 1);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex, images]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!images) {
    return <h4>sorry, image cannot be loaded</h4>;
  }

  return (
    <main className={`${styles.main}`}>
      <ToggleLanguageButton
        inEnglish={inEnglish}
        onToggleLanguage={handleToggleLanguage}
      />
      <HomepageHeader />
      {/* <div className={`${styles.navbox}`}> */}
      <Link href="/workshops" className="navLink">
        <button className={`${styles.navButton} ${styles.workshopButton}`}>
          Workshops
        </button>
      </Link>
      <Link href="/booking" className="navLink">
        <button className={`${styles.navButton} ${styles.bookingButton}`}>
          Booking
        </button>
      </Link>
      <Link href="/media" className="navLink">
        <button className={`${styles.navButton} ${styles.mediaButton}`}>
          {inEnglish ? "Media" : "Medien"}
        </button>
      </Link>

      <div className={`${styles.imagebox}`}>
        <Image
          src={images[currentIndex].url}
          alt="Profile Picture"
          className={`${styles.homeImage}`}
          fill={true}
        />
      </div>
      {/* </div> */}
      <Quote isEnglish={inEnglish} />
    </main>
  );
}
