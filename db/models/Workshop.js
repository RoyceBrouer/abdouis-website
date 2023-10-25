import mongoose from "mongoose";
import Image from "./Image";

const { Schema } = mongoose;

const workshopSchema = new Schema({
  titleEnglish: String,
  titleGerman: String,
  textEnglish: String,
  textGerman: String,
  images: { type: [Schema.Types.ObjectId], ref: Image },
});

const Workshop =
  mongoose.models.Workshop || mongoose.model("Workshop", workshopSchema);

export default Workshop;
