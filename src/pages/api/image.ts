import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { rank, role, winner, token } = req.body;
  const { data } = await axios.post(
    "https://chess-champs-nft-image-generator.up.railway.app/api/v1/generate",
    {
      rank: rank,
      role: role,
      iswinner: winner,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  res.status(200).send({
    url: data.url,
  });
}
