import "@/styles/globals.css";
// import GlobalStyle from "../styles";
// import useSWR, { SWRConfig } from "swr";
// import Layout from "@/components/Layout";
import { useState } from "react";
// import { uid } from "uid";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
  // const { data, isLoading, error } = useSWR(
  //   `temporary-resources/images`,
  //   fetcher
  // );

  return <Component {...pageProps} />;
}
