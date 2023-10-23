import dbConnect from "../../../../db/connect";
import Image from "../../../../db/models/Image";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const images = await Image.find();
    return response.status(200).json(images);
  }
}
