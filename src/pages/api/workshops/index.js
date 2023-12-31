import dbConnect from "../../../../db/connect";
import Workshop from "../../../../db/models/Workshop";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const workshops = await Workshop.find().populate("images");
    return response.status(200).json(workshops);
  }
}
