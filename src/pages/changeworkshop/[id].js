import React from "react";
import ChangeWorkshopForm from "@/components/ChangeWorkshopForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Fragment } from "react";
import Image from "next/image";

export default function ChangeWorkshopPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: workshop, isLoading, error } = useSWR(`/api/workshops/${id}`);

  const handleDeleteImage = async (id) => {
    const response = await fetch(`/api/changeworkshopimage/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    });
  };

  const handleChangeWorkshopText = async (text) => {
    const response = await fetch(`/api//${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    });
  };
  // const handleChangeWorkshopText = async (text) => {};

  if (!isReady || !workshop || isLoading || error) return <h2>Loading...</h2>;
  if (!session) {
    return <h2> sorry you do not have authorization for this admin page </h2>;
  } else {
    return (
      <form key={id}>
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
              <button type="button" onClick={handleDeleteImage}>
                Delete Image
              </button>
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
          ;
        </div>
      </form>
    );
  }
}
