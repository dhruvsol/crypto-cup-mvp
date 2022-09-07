import Image from "next/image";
import React from "react";

const NFTCard = () => {
  return (
    <>
      <div className="relative bg-[#1D2036] h-fit w-[33rem] rounded-lg flex justify-start items-start p-6">
        <div className=" mr-8">
          <Image src="/winner.png" alt="winner" width={180} height={180} />
        </div>
        <div className="">
          <div className="">
            <p className="text-sm text-[#464C72]">Name</p>
            <h1 className="text-base text-white  font-bold ">Vampo is bitch</h1>
          </div>
          <div className="mt-5 flex justify-start gap-x-5 items-center w-[17rem]">
            <div>
              <p className="text-sm text-[#464C72]">Level</p>
              <h1 className="text-lg text-white">200</h1>
            </div>
            <hr className="w-10 rotate-90 !bg-black " />
            <div>
              <p className="text-sm text-[#464C72]">xp</p>
              <h1 className="text-lg text-white">200XP</h1>
            </div>
            <hr className="w-10 rotate-90 " />
            <div>
              <p className="text-sm text-[#464C72]">Rank</p>
              <h1 className="text-lg text-white">#200</h1>
            </div>
          </div>
          <div className="absolute flex justify-center gap-x-1 bottom-8 right-6">
            <h1 className="text-white font-bold text-base">ChessChamp</h1>
            <h1 className="text-[#7980B7] bg-[#3D4267] px-2 font-bold ">NFT</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default NFTCard;
