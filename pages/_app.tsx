import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../lib/authContext";
import { SavedProvider } from "../lib/savedContext";
import Head from "next/head";
import Image from "next/image";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SavedProvider>
        <Image
          src="https://cfcdn.apowersoft.info/astro/picwish/assets/index-fourth-bg.a19a2877.svg"
          width="100"
          height="100"
          className=" absolute w-1/2 left-1/2 overflow-hidden pointer-events-none opacity-40"
          alt="bg-img"
        ></Image>
        <Image
          src="https://cfcdn.apowersoft.info/astro/picwish/assets/index-fourth-bg.a19a2877.svg"
          width="100"
          height="100"
          className=" absolute w-1/3 right-1/3 overflow-hidden pointer-events-none opacity-30 rotate-180"
          alt="bg-img"
        ></Image>
        <Image
          src="https://cfcdn.apowersoft.info/astro/picwish/assets/index-fourth-bg.a19a2877.svg"
          width="100"
          height="100"
          className=" absolute w-1/4 left-1/4 overflow-hidden pointer-events-none opacity-10 rotate-45"
          alt="bg-img"
        ></Image>
        <Component {...pageProps} />
      </SavedProvider>
    </AuthProvider>
  );
}
