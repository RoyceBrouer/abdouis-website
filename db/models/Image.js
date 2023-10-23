import mongoose from "mongoose";
const { Schema } = mongoose;

const imageSchema = new Schema({
  image: String,
  url: { type: String, required: true },
});

const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);

export default Image;
