import React from "react";
import useSWR from "swr";

export default function Quote({ isEnglish }) {
  const { data: textsnippets, isLoading } = useSWR("/api/textsnippets/");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!textsnippets) {
    return <h1>refresh</h1>;
  }
  const quote = textsnippets.find(
    (textsnippet) => textsnippet.matter === "quote"
  );
  const { english, deutsch } = quote;

  return <h3>{isEnglish ? `"${english}"` : `"${deutsch}"`}</h3>;
}
