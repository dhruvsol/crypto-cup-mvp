import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "use-supabase-hooks";
import { supabase } from "../lib/supabase";

const Home: NextPage = ({ user }: any) => {
  const { user: clientUser } = useUser(supabase);
  const { signIn, signOut } = useAuth(supabase);
  console.log(clientUser);
  const [User, setUser] = useState<boolean>(false);
  const [UserData, setUserData] = useState<any>(null);

  const router = useRouter();
  useEffect(() => {
    if (clientUser || user) {
      setUser(true);
      setUserData(clientUser);
    }
  }, [clientUser, user]);
  return (
    <>
      <div className="relative flex lg:justify-center md:gap-x-20 flex-col lg:flex-row min-h-screen  items-center overflow-hidden">
        <div className="text-white z-20  absolute bottom-6 flex items-center flex-col  lg:static lg:items-start max-w-[28rem]  ">
          <h1 className="lg:text-5xl lg:font-bold text-xl mt-2 font-sans-pro text-center  lg:text-left">
            Chess Mates
          </h1>
          <br />
          <p className=" text-white text-base font-normal my-4 text-center lg:text-left lg:text-sm">
            Chess Mates is a dynamic NFT that exports your Chess Champs
            reputation on-chain and creates a unique profile picture. The NFT
            can be updated each time you reach a new level (up to 3 times).
            <br />
            <br />
            Mint yours for free with a few easy steps!
          </p>
          <ul className="list-disc ml-4 ">
            <li>Join our Discord server</li>
            <li>Reach level Pawn</li>
            <li>Setup & connect your Phantom wallet</li>
            <li>Claim your NFT!</li>
          </ul>
          <br />
          <p className=" text-white text-base font-normal my-4 text-center lg:text-left lg:text-sm">
            Your NFT will unlock special access rights to various exclusive
            events and also hold your player rank & score, stored directly on
            the blockchain. Questions? Check out our FAQ
          </p>
          <br />
          {!User ? (
            <>
              <button
                onClick={async () => {
                  await signIn({
                    provider: "discord",
                  });
                }}
                className="bg-[#5344FF] h-10 w-[5rem] lg:w-full rounded text-[0.7rem] lg:text-sm"
              >
                Continue with discord
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  router.push(`/nfts/${UserData.identities![0]?.id}`);
                }}
                className="bg-[#5344FF] h-10 w-fit px-5 lg:w-full rounded text-[0.7rem] lg:text-sm"
              >
                Continue as {UserData?.email}
              </button>
            </>
          )}
        </div>
        <div className="md:block ">
          <Image
            src={"/assets/landing.svg"}
            alt={"bgimage"}
            width={500}
            height={500}
          />
        </div>
      </div>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const user = await supabase.auth.api.getUserByCookie(req, res);

  console.log("user", user);
  return {
    props: {
      user: user.user,
    },
  };
};
export default Home;
