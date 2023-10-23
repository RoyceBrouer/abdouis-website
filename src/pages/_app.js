import "@/styles/globals.css";
// nodemailer = require("nodemailer");
// import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
// import Layout from "@/components/Layout";
import { useState } from "react";

export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}
