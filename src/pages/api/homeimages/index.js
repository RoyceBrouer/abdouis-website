import dbConnect from "../../../../db/connect";
import Homeimage from "../../../../db/models/Homeimage";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "./auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const homeimages = await Homeimage.find();
    return response.status(200).json(homeimages);
  }
}
