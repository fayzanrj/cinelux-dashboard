import mongoose, { Schema } from "mongoose";

const movieSchema = new Schema({
  imdb_id: { type: String, required: false },
  title: { type: String, required: true },
  overview: { type: String, required: true },
  poster_path: { type: String, required: true },
  runtime: { type: Number, required: false },
  tagline: { type: String, required: false },
  vote_average: { type: Number, required: false },
  original_language: { type: String, required: false },
  release_date: { type: String, required: true },
  trailer_link: { type: String, required: false },
  genres: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
    },
  ],
  isBooking: { type: Boolean, required: true },
  status: {
    type: String,
    enum: ["NOW_SHOWING", "COMING_SOON"],
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
