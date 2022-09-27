import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <div className="bg-black min-h-screen h-full overflow-hidden">
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default MyApp;
