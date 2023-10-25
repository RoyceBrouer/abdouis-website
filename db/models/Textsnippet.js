import mongoose from "mongoose";
const { Schema } = mongoose;

const textsnippetSchema = new Schema({
  matter: String,
  english: String,
  deutsch: String,
});

const Textsnippet =
  mongoose.models.Textsnippet ||
  mongoose.model("Textsnippet", textsnippetSchema);

export default Textsnippet;
