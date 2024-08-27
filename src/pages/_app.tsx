import Layout from "@/components/layout";
import "@/styles/global-tailwind.css";
import "@/styles/index.scss";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import "react-datepicker/dist/react-datepicker.css";
import { AuthProvider } from "@/context/useUser";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pyramid Play CMS</title>
        <link rel="icon" type="image/png" href="/icon.png" />
      </Head>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
          <Toaster containerClassName="!z-[1000000000]" />
        </Layout>
      </AuthProvider>
    </>
  );
}
