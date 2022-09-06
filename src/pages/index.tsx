import type { NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <div className="relative flex justify-between min-h-screen  items-center overflow-hidden">
        <div className="text-white  max-w-[28rem] lg:ml-[6rem] xl:ml-[12rem] ">
          <Image
            src={"/assets/squareicon.svg"}
            alt={"square image"}
            width={25}
            height={25}
          />
          <h1 className="text-4xl font-dm-serif">
            The NFT for the chess <br /> players & enthusiasts
          </h1>
          <p className=" text-[#6C8597] text-base font-normal my-4">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto{" "}
          </p>
          <button className="bg-[#5344FF] h-10 w-full rounded">
            Continue with discord
          </button>
        </div>
        <div className="absolute  top-10 -right-72">
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

export default Home;

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const TechnologyCard = ({
  name,
  description,
  documentation,
}: TechnologyCardProps) => {
  return (
    <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <a
        className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </a>
    </section>
  );
};
