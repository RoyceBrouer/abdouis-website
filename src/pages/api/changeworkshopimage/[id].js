import dbConnect from "../../../../db/connect";
import Workshop from "../../../../db/models/Workshop";
import Image from "../../../../db/models/Image";

export default async function handler(request, response) {
  if (request.method === "PUT") {
    await dbConnect();
    const { id } = request.query;

    try {
      const workshop = await Workshop.findById(id);

      if (!workshop) {
        return response.status(404).json({ error: "Workshop not found" });
      }
      const image = await Image.findByIdAndUpdate(workshop.images[0]._id, {
        $set: request.body,
      });

      //   image.url = request.body;

      //   await image.save();

      response
        .status(200)
        .json({ message: "Workshop image updated successfully" });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal server error" });
    }
  } else {
    response.status(405).json({ error: "Method not allowed" });
  }
}
