import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    bookingNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    showtimeId: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    screen: {
      type: String,
      required: true,
    },
    seats: [
      {
        type: String,
        required: true,
      },
    ],
    movie: {
      title: {
        type: String,
        required: true,
      },
    },
    isPaid: {
      type: Boolean,
      required: true,
    },
    paymentId: {
      type: String,
      required: false,
    },
    paymentSessionId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
