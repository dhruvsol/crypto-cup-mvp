import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const MobileNav = () => {
  const router = useRouter();
  return (
    <>
      <div className="fixed flex justify-center items-center w-full top-0 z-40 mt-16  md:hidden">
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
      </div>
    </>
  );
};
