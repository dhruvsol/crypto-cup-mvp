import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { Navbar } from "../components/Navigations/Navbar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <div className="bg-black min-h-screen h-full overflow-hidden">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default MyApp;
