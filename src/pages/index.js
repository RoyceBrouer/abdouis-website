import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Button from "@/components/Button";
import HomepageHeader from "@/components/HomepageHeader/HomepageHeader";
import useSWR from "swr";
import { useState } from "react";
import { useEffect } from "react";
import Quote from "@/components/Quote";

export default function Home() {
  const { data: images, isLoading } = useSWR("/api/homeimages");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex === images?.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex((currentIndex) => currentIndex + 1);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex, images]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!images) {
    return <h4>sorry, image cannot be loaded</h4>;
  }
  console.log(images);

  return (
    <>
      <Head>
        <title>F. Abdoui Mohamed</title>
        {/* <meta name="description" content="Generated by create next app" /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${styles.frame}`}>
        <HomepageHeader />
        <div className={`${styles.navbox}`}>
          <Button className={`${styles.navButton__workshopButton}`}>
            <Link href="/workshops" className="navLink">
              Workshops
            </Link>
          </Button>
          <Button className={`${styles.navButton__bookingButton}`}>
            <Link href="/booking" className="navLink">
              Booking
            </Link>
          </Button>
          <Button className={`${styles.navButton__mediaButton}`}>
            <Link href="/media" className="navLink">
              Media
            </Link>
          </Button>
        </div>
        <div className={`${styles.imagebox}`}>
          <Image
            src={images[currentIndex].url}
            alt="Profile Picture"
            className={`${styles.homeImage}`}
            fill={true}
          />
        </div>
        <Quote />
      </main>
    </>
  );
}
