import mongoose, { Schema } from "mongoose";

const bookingNumberSchema = new Schema(
  {
    number: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const BookingNumber = mongoose.model("BookingNumber", bookingNumberSchema);

export default BookingNumber;
