import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
