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
      <div className="relative flex lg:justify-between flex-col lg:flex-row min-h-screen  items-center overflow-hidden">
        <div className="text-white z-20  absolute bottom-6 flex items-center flex-col  lg:static lg:items-start max-w-[28rem] lg:ml-[6rem] xl:ml-[12rem] ">
          <Image
            src={"/assets/squareicon.svg"}
            alt={"square image"}
            width={25}
            height={25}
          />
          <h1 className="lg:text-4xl text-xl mt-2 font-dm-serif text-center  lg:text-left">
            The NFT for the chess <br /> players & enthusiasts
          </h1>
          <p className=" text-[#6C8597] text-base font-normal my-4 text-center lg:text-left">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto{" "}
          </p>
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
        <div className="absolute   top-10 -right-72">
          <Image
            src={"/assets/landing.svg"}
            alt={"bgimage"}
            width={1000}
            height={600}
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
