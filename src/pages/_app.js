import "@/styles/globals.css";
// import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
// import Layout from "@/components/Layout";
import Layout from "@/components/Layout";
import useLocalStorageState from "use-local-storage-state";

export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const [inEnglish, setInEnglish] = useLocalStorageState("inEnglish", {
    defaultValue: false,
  });

  const handleToggleLanguage = () => {
    setInEnglish((inEnglish) => !inEnglish);
  };

  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <Layout>
        <Component
          {...pageProps}
          inEnglish={inEnglish}
          handleToggleLanguage={handleToggleLanguage}
        />
      </Layout>
    </SWRConfig>
  );
}
