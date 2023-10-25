import dbConnect from "../../../../db/connect";
import Textsnippet from "../../../../db/models/Textsnippet";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const textsnippets = await Textsnippet.find();

    return response.status(200).json(textsnippets);
  }
}
