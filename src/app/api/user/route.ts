import type { NextApiRequest, NextApiResponse } from "next";

export const runtime = "edge";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  console.log("Form Data", data);
  // const id = await createItem(data)
  res.status(200).json(req.body);
}
