import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaDiscord } from "react-icons/fa";
import { useAuth, useUser } from "use-supabase-hooks";
import { GrLogout } from "react-icons/gr";
import { supabase } from "../../lib/supabase";
interface Props {
  setUserData?: Dispatch<SetStateAction<any>>;
}
export const Navbar = (props: Props) => {
  const { user } = useUser(supabase);
  const { signIn, signOut } = useAuth(supabase);
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
      <div className="hidden fixed top-0 z-50 md:flex justify-center w-full items-center gap-x-5 pt-4">
        <div className="flex relative justify-center items-center gap-x-3">
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
              <div className="text-white  mt-7">
                <h1 className="font-bold uppercase text-base ">
                  powered by CandyPay
                </h1>
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
              <>
                <h1 className="text-white font-semibold text-base">
                  {user?.user_metadata.name}
                </h1>
                <button
                  onClick={() => {
                    props.setUserData!(null);
                    signOut();
                  }}
                >
                  <GrLogout className="text-white   h-7 w-7" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
