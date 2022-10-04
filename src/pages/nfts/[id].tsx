import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { useUser } from "use-supabase-hooks";
import { supabase } from "../../lib/supabase";
import axios from "axios";
import { useRouter } from "next/router";
import { Web3Storage } from "web3.storage";
import {
  TransactionRequestURLFields,
  encodeURL,
  createQR,
  FindReferenceError,
  findReference,
} from "@solana/pay";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import { Success } from "../../components/success";
import { Navbar } from "../../components/Navigations/Navbar";
const roleName = [
  "",
  "pawn",
  "knight",
  "bishop",
  "rook",
  "queen",
  "king",
  "king",
];
const rolesid = [
  "",
  "993835383848706128",
  "993835690951462912",
  "993835791228878938",
  "993835869809164359",
  "993835946829164546",
  "993835974092144710",
  "1005435497570639943",
];
const getHighestRole = (r: string[]) => {
  let high = 0;
  r.map((r: string) => {
    if (rolesid.indexOf(r) > high) {
      high = rolesid.indexOf(r);
    }
  });
  return high;
};
const NFTs = () => {
  const qrRef = useRef<HTMLDivElement>(null);
  const sessionToken = supabase.auth.session();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [xpInfo, setXpinfo] = useState<any>(null);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [mint, setMint] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingNFT, setLoadingNFT] = useState<boolean>(false);
  const [claimNFT, setClaimNFT] = useState<boolean>(false);
  const [solanaURl, setSolanaUrl] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [paid, setPaid] = useState<boolean | null>(null);
  const connection = new Connection(clusterApiUrl("devnet"));
  const [signature, setSignature] = useState<string>("");
  const client = new Web3Storage({
    token: process.env.NEXT_PUBLIC_WEB3_STORAGE as string,
  });
  const reference = useMemo(() => {
    return Keypair.generate();
  }, []);
  useEffect(() => {
    const GetInfo = async () => {
      setLoading(true);
      await axios
        .post(
          "https://chess-champs-api-production.up.railway.app/api/v1/roles",
          {
            guild: "880024529714425887",
            user: router.query.id,
            role: "993835383848706128",
          },
          {
            headers: {
              Authorization: `Bearer ${sessionToken?.access_token}`,
            },
          }
        )
        .then(async (r) => {
          setUserInfo(r.data.user);
          const highest = getHighestRole(r.data.user.roles);

          // address, level, xp, rank, icon

          await axios
            .get(
              `https://chess-champs-api-production.up.railway.app/api/v1/ranks?id=${router.query.id}`,
              {
                headers: {
                  Authorization: `Bearer ${sessionToken?.access_token}`,
                },
              }
            )
            .then(async (r) => {
              setXpinfo(r.data.metadata);
              setLoading(false);
            });
        });
    };
    GetInfo();
  }, [router.query.id]);
  useEffect(() => {
    if (solanaURl) {
      const qr = createQR(solanaURl, 348, "transparent", "white");
      if (qrRef.current) {
        qrRef.current.innerHTML = "";
        qr.append(qrRef.current);
      }
    }
  }, [solanaURl]);
  const GetImage = async () => {
    const highest = getHighestRole(userInfo?.roles);

    await axios
      .post("/api/image", {
        rank: xpInfo?.xp,
        role: roleName[highest],
        iswinner: highest != 7 ? false : true,
        token: sessionToken?.access_token,
      })
      .then((r) => {
        setImgUrl(r.data.url);
        setLoadingNFT(false);
      });
  };
  const GetUrl = async (URI: string) => {
    const res = axios.post(
      "https://chess-champs-api-production.up.railway.app/api/v1/generate",
      {
        user: "Crypto Cup",
        name: "Crypto Cup",
        symbol: "CPCP",
        uri: URI,
        label: "Crypto Cup",
        icon: "https://candypay.fun/logo.png",
        network: "devnet",
        reference: reference.publicKey.toString(),
      },
      {
        headers: {
          Authorization: `Bearer ${sessionToken?.access_token}`,
        },
      }
    );
    return (await res).data;
  };
  const uploadmetadata = async (img: any) => {
    const metadata = {
      name: "Crypto Cup",
      symbol: "CPC",
      description:
        "Your discord reputation for FTX Crypto Cup Championship as an on-chain NFT, which stays with you forever!!",
      seller_fee_basis_points: 10000,
      image: img,
      external_url: "https://www.ftxcryptocup.com/",
      attributes: [
        {
          trait_type: "xp",
          value: xpInfo?.xp,
        },
        {
          trait_type: "level",
          value: xpInfo?.level,
        },
        {
          trait_type: "rank",
          value: xpInfo?.rank,
        },
        {
          trait_type: "powered by",
          value: "CandyPay",
        },
      ],
      collection: {
        name: "Crypto Cup",
        family: "Crypto Cup",
      },
      properties: {
        files: [{ uri: img, type: "image/png" }],
        category: "image",
        creators: [
          {
            address: "AxFuniPo7RaDgPH6Gizf4GZmLQFc4M5ipckeeZfkrPNn", // change with the newly created payer wallet
            share: 100,
          },
        ],
      },
    };
    const blob = new Blob([JSON.stringify(metadata)], {
      type: "application/json",
    });
    const metadataFile = new File([blob], "metadata.json");
    const meta_cid = await client.put([metadataFile]);
    return `https://cloudflare-ipfs.com/ipfs/${meta_cid}/metadata.json`;
  };
  const uploadMeta = async () => {
    await uploadmetadata(`${imgUrl}`).then(async (r) => {
      await GetUrl(r).then(async (r) => {
        const transactionRequestURLFields: TransactionRequestURLFields = {
          link: new URL(`${r.metadata.solana_url}`),
        };
        const solurl = encodeURL(transactionRequestURLFields).href;
        setSolanaUrl(solurl);
        setClaimNFT(false);
      });
    });
  };

  let a = 0;
  useEffect(() => {
    if (paid === false) {
      const inter = setInterval(() => {
        const GetInfo = async () => {
          if (paid) return;
          try {
            // Check if there is any transaction for the reference
            const signatureInfo = await findReference(
              connection,
              reference.publicKey
            );
            const result = await connection.getTransaction(
              signatureInfo.signature
            );

            const mint =
              result?.transaction.message.accountKeys[1]!.toString() as string;
            const publicKey =
              result?.transaction.message.accountKeys[2]!.toString() as string;
            a = a + 1;
            setPaid(true);
            setSignature(mint);
            clearInterval(inter);
            if (a === 1) {
              sendAddress(mint, publicKey);
            }
          } catch (e) {
            if (e instanceof FindReferenceError) {
              return;
            }
            console.error("Unknown error", e);
          }
        };
        setTimeout(() => {
          if (a != 1) {
            GetInfo();
          }
        }, 1000);
      }, 10000);
    }
  }, [solanaURl]);

  const sendAddress = useCallback((mint: string, pubkey: string) => {
    if (success) return;
    setSuccess(true);
    axios.post(
      "https://chess-champs-api-production.up.railway.app/api/v1/utils/mint-address",
      {
        user: router.query.id,
        public_key: pubkey,
        mint_address: mint,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionToken?.access_token}`,
        },
      }
    );
  }, []);

  return (
    <>
      <Navbar />
      <div className="absolute z-10 top-0 w-full h-1/2">
        <Image src="/square.png" alt="squares" layout="fill" />
      </div>
      {!mint && (
        <div className="z-40 pt-20 relative flex justify-center min-h-screen items-center flex-col gap-y-3 ">
          <div className="flex items-center flex-col mt-3">
            <h1 className="font-sans-pro font-bold text-white text-2xl lg:text-4xl ">
              Mint a Chess Mates
            </h1>
            <p className="text-white font-medium text-xs lg:text-base">
              Just a few steps to get started and get your NFT
            </p>
          </div>
          <div className="relative bg-[#FFFFFF] px-3 py-2 w-[20rem] h-[20rem] lg:w-[30rem] lg:h-max lg:flex lg:flex-col lg:items-start lg:p-8 lg:mt-7 lg:rounded-xl">
            <div className="flex justify-center items-center  gap-x-4 ">
              <div className=" bg-[#5344FF] p-2 rounded-full  ">
                <AiFillCheckCircle size={"1.2rem"} color={"white"} />
              </div>
              <div className="flex flex-col justify-center py-4 items-start ">
                <h1 className="text-xs text-black font-medium lg:text-base">
                  Discord Connected
                </h1>
                <h3 className="text-xs text-[#464C72]  font-medium lg:text-base">
                  {userInfo?.displayName} is connected and verified
                </h3>
              </div>
            </div>
            <hr className="border-[#24273D] mx-10 w-[80%]" />
            <div className="  hidden lg:flex absolute left-12 top-[5.5rem] items-start justify-start h-48 flex-col ">
              <div className="bg-[#5344FF]  h-1/2 w-0.5 " />
              <div
                className={` ${
                  !loading ? "bg-[#5344FF]" : "bg-[#212640]"
                }  h-1/2 w-0.5 `}
              />
            </div>
            <div className="lg:mx-12 mt-6 lg:my-8 flex justify-center lg:justify-start gap-x-10 items-center w-[18rem]">
              <div>
                <p className="text-base text-[#464C72]">Level</p>
                <h1 className="text-base lg:text-xl text-black">
                  {xpInfo?.level === undefined ? 0 : xpInfo?.level}
                </h1>
              </div>
              <div>
                <p className="text-base text-[#464C72]">xp</p>
                <h1 className="text-base lg:text-xl text-black">
                  {xpInfo?.xp === undefined ? 0 : xpInfo?.xp}XP
                </h1>
              </div>
              <div>
                <p className="text-base text-[#464C72]">Rank</p>
                <h1 className="text-base lg:text-xl text-black">
                  #{xpInfo?.rank === undefined ? 0 : xpInfo?.rank}
                </h1>
              </div>
            </div>
            <div className=" mt-11 w-full">
              <div className="flex justify-center items-center w-full  gap-x-4 ">
                {loading ? (
                  <div className="lg:ml-0.5" role="status">
                    <svg
                      aria-hidden="true"
                      className=" w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#5344FF]"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className=" bg-[#5344FF] p-2 rounded-full  ">
                    <AiFillCheckCircle size={"1.2rem"} color={"white"} />
                  </div>
                )}

                <button
                  disabled={loading}
                  onClick={() => {
                    GetImage();
                    setMint(true);
                    setLoadingNFT(true);
                  }}
                  className="bg-[#5344FF] disabled:opacity-50 h-10 w-full px-5 lg:w-full rounded text-[0.7rem] text-white  lg:text-base"
                >
                  Get Your NFT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {mint && !success && (
        <>
          {!loadingNFT ? (
            <div className="relative z-40">
              {!solanaURl ? (
                <div className="flex justify-center min-h-screen  w-full items-center flex-col">
                  <h1 className="font-sans-pro font-bold text-white text-2xl lg:text-4xl ">
                    Claim Your NFT
                  </h1>
                  <br />
                  <p className="text-white font-medium text-xs lg:text-base mb-7">
                    Press the button below to mint your NFT
                  </p>
                  <Image
                    src={imgUrl}
                    alt="nft Image"
                    width={400}
                    height={400}
                    priority
                  />
                  <button
                    onClick={() => {
                      setClaimNFT(true);
                      setPaid(false);
                      uploadMeta();
                    }}
                    className="bg-[#590059] font-sans-pro font-semibold mt-10 h-10 w-[20rem] px-5 lg:w-[20rem] rounded text-[0.7rem] text-white  lg:text-base"
                  >
                    {claimNFT ? (
                      <div
                        className="lg:ml-0.5 flex justify-center"
                        role="status"
                      >
                        <svg
                          aria-hidden="true"
                          className=" w-8 h-8 text-gray-200 animate-spin dark:text-black fill-[#2713ff]"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </div>
                    ) : (
                      "Claim your NFT"
                    )}
                  </button>
                </div>
              ) : (
                <div className="flex justify-center min-h-screen w-full items-center flex-col">
                  <h1 className="font-sans-pro font-bold text-white text-2xl lg:text-4xl ">
                    Claim Your NFT
                  </h1>
                  <br />
                  <p className="text-white font-medium text-xs lg:text-base mb-7">
                    Scan the QRCode from your wallet
                  </p>
                  <div ref={qrRef} />
                  <button
                    onClick={() => {
                      router.push(solanaURl);
                    }}
                    className="bg-[#590059] disabled:opacity-50 h-10 w-80 mt-5 px-5  rounded text-[0.7rem] text-white  lg:text-base"
                  >
                    Tap to Mint
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div
              className="lg:ml-0.5 flex justify-center min-h-screen flex-col lg:gap-y-6 w-full items-center"
              role="status"
            >
              <svg
                aria-hidden="true"
                className=" w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#5344FF]"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <h1 className="flex justify-center text-2xl font-bold text-white">
                Getting NFT Ready
              </h1>
            </div>
          )}
        </>
      )}
      {success && <Success signature={signature} imgUrl={imgUrl} />}
    </>
  );
};

export default NFTs;
