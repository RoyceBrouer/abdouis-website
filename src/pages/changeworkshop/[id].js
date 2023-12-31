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
  const [workshopData, setWorkshopData] = useState();

  function handleChangeImageOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleChangeImageOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "hc6mref0");
    //maybe append more here?
    console.log("FORMDATA", formData);

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dkrguoage/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);

    const newImage = { ...workshop.images[0], url: imageSrc }; //supposed to create data for one new image document within images that holds the _Id of the first image of that workshop

    //below id is referring to the router query so to the workshop id, not yet workshop.images[0]._id
    const response = await fetch(`/api/changeworkshopimage/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newImage), //is this correct?
    });
  }

  const handleChangeWorkshop = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const workshopModifications = Object.fromEntries(formData);

    setWorkshopData({ ...workshopModifications, images: workshop.images });

    try {
      const response = await fetch(`/api/workshops/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workshopData),
      });
      if (!response.ok) {
        console.error(response.status);
      }
    } catch (error) {
      console.error(error);
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
                onChange={handleChangeImageOnChange}
                onSubmit={handleChangeImageOnSubmit}
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
        <form onSubmit={handleChangeWorkshop}>
          <div className={`${styles.textbox}`}>
            <label id="titleEnglish">Title English</label>
            <input
              type="text"
              name="titleEnglish"
              id="titleEnglish"
              defaultValue={workshop.titleEnglish}
            />
            <label id="titleGerman">Title German</label>
            <input
              type="text"
              name="titleGerman"
              id="titleGerman"
              defaultValue={workshop.titleGerman}
            />
            <label id="textEnglish"> Text English</label>
            <textarea
              name="textEnglish"
              id="textEnglish"
              defaultValue={workshop.textEnglish}
              rows="20"
              cols="auto"
            />
            <label id="textGerman"> Text German</label>
            <textarea
              name="textGerman"
              id="textGerman"
              defaultValue={workshop.textGerman}
              rows="20"
              cols="auto"
            />
          </div>
          <button className={`${styles.submitButton}`}>Submit Changes</button>
        </form>
      </main>
    );
  }
}
