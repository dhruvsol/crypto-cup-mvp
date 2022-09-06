import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <div className="bg-Background.blue min-h-screen h-full">
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default MyApp;
