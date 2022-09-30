import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
const Test = () => {
  const router = useRouter();

  console.log(router.query.role);

  return (
    <>
      <div className="flex justify-center  min-h-screen items-center">
        <div className="relative">
          <Image
            src={`/NFT/${router.query.role}.png`}
            alt={"NFT Image"}
            width={300}
            height={300}
          />
          <h1 className="text-black/60 absolute bottom-8 left-36 text-3xl font-sans-pro font-bold">
            {router.query.rank}
          </h1>
          {router.query.winner === "true" && (
            <div className="absolute top-0 right-0 left-0 ">
              <Image
                src={"/NFT/winner.png"}
                alt={"Nft Image"}
                width={300}
                height={300}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Test;
