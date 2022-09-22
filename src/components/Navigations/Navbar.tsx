import Image from "next/image";
import React from "react";
import { FaDiscord } from "react-icons/fa";
import { useUser } from "use-supabase-hooks";
import { supabase } from "../../lib/supabase";
export const Navbar = () => {
  const { user, loading } = useUser(supabase);

  return (
    <>
      <div className="hidden lg:flex justify-between items-center gap-x-5 pt-4 px-48">
        <Image
          width={150}
          height={55}
          src="/assets/logo.svg"
          alt="logo chess champs"
        />
        <div className="flex justify-center  items-center ">
          <ul className="flex justify-evenly   w-[35rem] ">
            <li className="text-white font-sans-pro font-semibold cursor-pointer">
              Home
            </li>
            <li className="text-white font-sans-pro font-semibold cursor-pointer">
              CHESS MATES
            </li>
            <li className="text-white font-sans-pro font-semibold cursor-pointer">
              TROPHIES
            </li>
            <li className="text-white font-sans-pro font-semibold cursor-pointer">
              GIVEAWAYS
            </li>
            <li className="text-white font-sans-pro font-semibold cursor-pointer">
              about
            </li>
            <li className="text-white font-sans-pro font-semibold cursor-pointer">
              FAQ
            </li>
          </ul>
          <div className="flex justify-center items-center gap-x-3 cursor-pointer py-2 px-8 border-l border-[#2E2840]">
            <FaDiscord color="#5344FF" fontSize={24} />

            <h1 className="text-[#5344FF] font-semibold text-base">
              Connect Discord
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};
