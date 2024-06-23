import mongoose from "mongoose";

const connectToDB = async () => {
  mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => {
      console.log("connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectToDB;
