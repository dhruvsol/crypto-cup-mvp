import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaDiscord } from "react-icons/fa";
import { useAuth, useUser } from "use-supabase-hooks";
import { boolean } from "zod";
import { supabase } from "../../lib/supabase";
export const Navbar = () => {
  const { user, loading } = useUser(supabase);
  const { signOut } = useAuth(supabase);
  const [userOn, setUserOn] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (user) {
      setUserOn(true);
    } else {
      setUserOn(false);
    }
  }, [user]);
  useEffect(() => {
    if (user?.app_metadata.provider != "discord") {
      signOut();
    }
  }, [user?.app_metadata.provider]);

  return (
    <>
      <div className=" flex justify-center items-center px-40 ml-5 ">
        <div className="hidden container lg:flex justify-between items-center gap-x-5 pt-4">
          <Link href={"/"}>
            <Image
              width={150}
              height={55}
              src="/assets/logo.svg"
              alt="logo chess champs"
            />
          </Link>
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
              {userOn ? (
                <Image
                  className="rounded-full"
                  src={user?.user_metadata.avatar_url}
                  alt="avatar url"
                  width={35}
                  height={35}
                />
              ) : (
                <FaDiscord color="#5344FF" fontSize={24} />
              )}

              {!userOn ? (
                <h1 className="text-[#5344FF] font-semibold text-base">
                  Connect Discord
                </h1>
              ) : (
                <h1 className="text-white font-semibold text-base">
                  {user?.user_metadata.name}
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
