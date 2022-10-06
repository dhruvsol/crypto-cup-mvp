import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handleAccess(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user, token } = req.body;
  const { data } = await axios.get(
    `https://chess-champs-api-production.up.railway.app/api/v1/utils/can-mint/?user=${user}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(data.status);
  res.status(200).send({
    url: data,
  });
}
