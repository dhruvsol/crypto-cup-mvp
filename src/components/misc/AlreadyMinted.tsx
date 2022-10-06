import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const AlreadyMinted = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-center items-center min-h-screen space-y-20 flex-col w-full">
        <div className="flex justify-center items-center gap-x-3">
          <div
            onClick={() => {
              router.push("/");
            }}
          >
            <Image
              width={150}
              height={55}
              className="cursor-pointer"
              src="/assets/logo.svg"
              alt="logo chess champs"
            />
          </div>
          <Link href={"https://candypay.fun"}>
            <a target={"_blank"}>
              <div className="text-white flex justify-center gap-x-2 px-4 py-1 rounded-lg border">
                <Image
                  width={30}
                  height={30}
                  className="cursor-pointer mb-10"
                  src="/assets/candypay.svg"
                  alt="logo candypay "
                />
                <div>
                  <h1 className="font-bold uppercase text-[0.5rem] ">
                    powered by
                  </h1>
                  <h1 className="font-medium text-base ">CandyPay</h1>
                </div>
              </div>
            </a>
          </Link>
        </div>
        <div>
          <h1 className="text-2xl font-sans-pro font-semibold text-white text-center">
            You have already Minted the NFT
          </h1>
          <p className="text-base text-white font-sans-pro text-center mb-6">
            You want to update the NFT then join the discord server
          </p>
          <p className="text-base text-yellow-500 font-sans-pro text-center ">
            If you think this is a mistake then contact the moderators
          </p>
        </div>
      </div>
    </>
  );
};

export default AlreadyMinted;
