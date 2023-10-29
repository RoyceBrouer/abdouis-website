import dbConnect from "../../../../../db/connect";
import Workshop from "../../../../../db/models/Workshop";
//import Image from "../../../../db/models/Image";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  console.log("REQUEST QUERY", request.query);
  console.log("id from request query", id);
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

  if (request.method === "PUT") {
    try {
      const { titleEnglish, titleGerman, textEnglish, textGerman } = req.body;

      await Workshop.findById(id);

      const workshop = await Workshop.findById(id);

      if (!workshop) {
        return response.status(404).json({ error: "Document not found" });
      }

      workshop.titleEnglish = titleEnglish;
      workshop.titleGerman = titleGerman;
      workshop.textEnglish = textEnglish;
      workshop.textGerman = textGerman;

      await document.save();

      response.status(200).json({ message: "Document updated successfully" });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal server error" });
    }
  } else {
    response.status(405).json({ error: "Method not allowed" });
  }
}
