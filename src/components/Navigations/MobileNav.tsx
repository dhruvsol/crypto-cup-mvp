import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
export const MobileNav = () => {
  const router = useRouter();
  return (
    <>
      <div className="fixed flex justify-between items-center w-full top-0 z-40 mt-5 sm:mt-16  md:hidden px-10">
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
        </div>
        <div>
          <GiHamburgerMenu className="w-10 h-10 text-white" />
        </div>
      </div>
    </>
  );
};
