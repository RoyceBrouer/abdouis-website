import React, { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "@/components/Buttons";
import Image from "next/image";
import useSWR from "swr";
import styles from "./WorkshopDetailsPage.module.css";
import ToggleLanguageButton from "@/components/Buttons/ToggleLanguageButton";
import { useSession } from "next-auth/react";
import ChangeWorkshopButton from "@/components/ChangeWorkshopButton";

export default function WorkshopDetailsPage({
  inEnglish,
  handleToggleLanguage,
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: workshop, isLoading, error } = useSWR(`/api/workshops/${id}`);

  console.log("id from router query", id);

  console.log("session", session);
  console.log("workshop", workshop);

  if (!isReady || !workshop || isLoading || error) return <h2>Loading...</h2>;

  return (
    <main className={`${styles.main}`}>
      <ToggleLanguageButton
        inEnglish={inEnglish}
        onToggleLanguage={handleToggleLanguage}
      />
      <div className={`${styles.navbox}`}>
        <Button>
          <Link href="../" className={`${styles.navLink}`}>
            {inEnglish ? "Home" : "Start"}
          </Link>
        </Button>
        <Button>
          <Link href="/workshops" className={`${styles.navLink}`}>
            {inEnglish ? "All Workshops" : "Alle Workshops"}
          </Link>
        </Button>
        <Button>
          <Link href="/booking" className={`${styles.navLink}`}>
            Booking
          </Link>
        </Button>
        <Button>
          <Link href="/media" className={`${styles.navLink}`}>
            {inEnglish ? "Media" : "Medien"}
          </Link>
        </Button>
      </div>
      {workshop.images.map((image) => {
        return (
          <Fragment key={image._id}>
            <div className={`${styles.imagebox}`}>
              <Image
                src={image.url}
                alt="Picture"
                className={`${styles.image}`}
                fill={true}
              />
            </div>
          </Fragment>
        );
      })}
      <div className={`${styles.textbox}`}>
        <h3 className={`${styles.workshopTitle}`}>
          {inEnglish ? workshop.titleEnglish : workshop.titleGerman}
        </h3>
        <p className={`${styles.workshopText}`}>
          {inEnglish ? workshop.textEnglish : workshop.textGerman}
        </p>
        {session && (
          <Link href={`/changeworkshop/${id}`}>
            <ChangeWorkshopButton />
          </Link>
        )}
      </div>
    </main>
  );
}
