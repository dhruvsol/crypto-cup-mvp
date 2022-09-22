import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsArrowUpRight } from "react-icons/bs";
interface Props {
  imgUrl: string;
  signature: string;
}
export const Success = (props: Props) => {
  const { imgUrl } = props;
  return (
    <div className="z-40 pt-20 relative flex justify-center items-center min-h-screen flex-col gap-y-3 ">
      <Image
        src="/assets/success.png"
        alt="square Icon"
        width={45}
        height={45}
      />
      <div className="flex items-center flex-col mt-3">
        <h1 className="font-normal font-dm-serif text-white text-2xl lg:text-4xl ">
          Successfully Claimed
        </h1>
        <p className="text-[#464C72] font-medium text-xs lg:text-base">
          You can check your wallet for the NFT
        </p>
      </div>
      <div className="my-10">
        <Image src={imgUrl} alt="nft Image" width={600} height={250} priority />
      </div>

      <div>
        <Link
          href={`https://explorer.solana.com/tx/${props.signature}?cluster=devnet`}
        >
          <a target={"_blank"}>
            <button className="w-80 h-10 flex justify-center items-center gap-x-2 border border-[#32375D] text-white ">
              View <BsArrowUpRight fontSize={"1rem"} />
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
};
