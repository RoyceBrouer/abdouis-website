import React from "react";
// import ChangeWorkshopForm from "@/components/ChangeWorkshopForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Fragment } from "react";
import Image from "next/image";
import styles from "./ChangeWorkshopPage.module.css";
import { useState } from "react";

export default function ChangeWorkshopPage({ inEnglish }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: workshop, isLoading, error } = useSWR(`/api/workshops/${id}`);

  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  /**
   * handleOnChange
   * Triggers when the file input changes (ex: when a file is selected)
   */

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  /* handleOnSubmit Triggers when the main form is submitted
   */

  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "your preset name");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/<your cloud name>/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
  }

  // const handleChangeImage = async (id) => {
  //   formData.append("upload_preset", "hc6mref0");

  //   const data = await fetch(
  //     "https://api.cloudinary.com/v1_1/dkrguoage/image/upload",
  //     {
  //       method: "POST",
  //       body: formData,
  //     }
  //   ).then((r) => r.json());
  //   const response = await fetch(`/api/changeworkshopimage/${id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(id),
  //   });
  // };

  const handleChangeWorkshop = async (workshop) => {
    const response = await fetch(`/api/workshops/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workshop),
    });
    if (!response.ok) {
      console.error(response.status);
      return;
    }
    router.push(`/workshops/${id}`);
  };

  if (!isReady || !workshop || isLoading || error) return <h2>Loading...</h2>;
  if (!session) {
    return <h2> sorry you do not have authorization for this admin page </h2>;
  } else {
    return (
      <main className={`${styles.main}`}>
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
              <form
                className={styles.form}
                method="post"
                onChange={handleOnChange}
                onSubmit={handleOnSubmit}
              >
                <p>
                  <input type="file" name="file" />
                </p>
                {imageSrc && !uploadData && (
                  <p>
                    <button>Replace Image</button>
                  </p>
                )}
                {uploadData && (
                  <code>
                    <pre>{JSON.stringify(uploadData, null, 2)}</pre>
                  </code>
                )}
              </form>
            </Fragment>
          );
        })}
        <form key={id} onSubmit={handleChangeWorkshop}>
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
      </main>
    );
  }
}
