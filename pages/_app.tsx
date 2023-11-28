import type { AppProps } from "next/app";
import "../styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-10/12">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
