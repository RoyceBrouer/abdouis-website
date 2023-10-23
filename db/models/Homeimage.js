import mongoose from "mongoose";
const { Schema } = mongoose;

const homeimageSchema = new Schema({
  image: String,
  url: { type: String, required: true },
});

const Homeimage =
  mongoose.models.Homeimage || mongoose.model("Homeimage", homeimageSchema);

export default Homeimage;
