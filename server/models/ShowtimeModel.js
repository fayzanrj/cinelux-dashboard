import mongoose, { Schema } from "mongoose";

const showtimeSchema = new Schema({
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  screen: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  movie: {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    poster_path: {
      type: String,
      required: true,
    },
  },
  booked: [
    {
      type: String,
      required: false,
    },
  ],
});

const Showtime = mongoose.model("Showtime", showtimeSchema);

export default Showtime;
