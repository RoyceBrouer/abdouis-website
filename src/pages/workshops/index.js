import React, { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "@/components/Buttons";
import Image from "next/image";
import Quote from "@/components/Quote";
import useSWR from "swr";
import styles from "./WorshopPage.module.css";
import Footer from "@/components/Footer";
import { useSession, signIn, signOut } from "next-auth/react";

export default function WorkshopPage({ inEnglish }) {
  const router = useRouter();
  const { data: workshops, isLoading } = useSWR("../api/workshops/");
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!workshops) {
    return <h4>sorry, page cannot be loaded</h4>;
  }

  return (
    <>
      <main className={`${styles.main}`}>
        <Link className={`${styles.stickyLink_Home}`} href="/">
          <button className={`${styles.navButton} ${styles.homeButton}`}>
            {inEnglish ? "Home" : "Start"}
          </button>
        </Link>
        <Link className={`${styles.stickyLink_Booking}`} href="/booking">
          <button className={`${styles.navButton} ${styles.bookingButton}`}>
            Booking
          </button>
        </Link>
        <Link className={`${styles.stickyLink_Media}`} href="/media">
          <button className={`${styles.navButton} ${styles.mediaButton}`}>
            {inEnglish ? "Media" : "Medien"}
          </button>
        </Link>
        {workshops.map((workshop) => {
          {
            console.log("workshop._id", workshop._id);
          }
          return (
            <div key={workshop._id} className={`${styles.workshopContainer}`}>
              <Link href={`/workshops/${workshop._id}`}>
                {workshop.images.map((image) => {
                  return (
                    <Fragment key={image._id}>
                      <div className={`${styles.imagebox}`}>
                        <Image
                          src={image.url}
                          alt="Picture"
                          className={`${styles.homeImage}`}
                          fill={true}
                        />
                      </div>
                    </Fragment>
                  );
                })}
                {/* <div className={`${styles.workshoptitleContainer}`}> */}
                <h6 className={`${styles.workshoptitle}`}>
                  {inEnglish ? workshop.titleEnglish : workshop.titleGerman}
                </h6>
                {/* </div> */}
              </Link>
            </div>
          );
        })}
      </main>
    </>
  );
}
