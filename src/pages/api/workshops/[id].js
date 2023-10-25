import dbConnect from "../../../../db/connect";
import Workshop from "../../../../db/models/Workshop";
//import Image from "../../../../db/models/Image";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const workshop = await Workshop.findById(id).populate("images");
    if (!workshop) {
      return response.status(404).json({ status: "Not found" });
    }
    response.status(200).json(workshop);
  }
}
