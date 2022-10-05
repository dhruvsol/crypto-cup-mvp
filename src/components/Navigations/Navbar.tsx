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
  const { signIn } = useAuth(supabase);
  const [userOn, setUserOn] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (user) {
      setUserOn(true);
    } else {
      setUserOn(false);
    }
  }, [user]);
  console.log(user);

  return (
    <>
      <div className="hidden fixed top-0 z-50 lg:flex justify-center w-full items-center gap-x-5 pt-4">
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
              <h1
                onClick={() => {
                  signIn({
                    provider: "discord",
                  });
                }}
                className="text-[#5344FF] font-semibold text-base"
              >
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
    </>
  );
};
