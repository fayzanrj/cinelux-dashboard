import mongoose, { Schema } from "mongoose";

const codeSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Code = mongoose.model("Code", codeSchema);

export default Code;
