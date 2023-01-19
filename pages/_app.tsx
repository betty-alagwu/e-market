import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import NextNProgress from "nextjs-progressbar";
import { StateContext } from "@/Context/StateContext";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <StateContext>
        <NextNProgress color="#f02d34" />
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </>
  );
}
