import {
  handleIncompleteError,
  handleNotFoundError,
} from "../libs/ThrowErrors.js";
import Movie from "../models/MovieModel.js";
import dateRegex from "../libs/dateRegex.js";

const ValidateShowtimeData = async (req, res, next) => {
  const showtime = req.body;

  // Validating time (example: should be in HH:MM AM/PM format)
  const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
  if (!timeRegex.test(showtime.time)) {
    return handleBadRequest(
      res,
      "Invalid time format. Time should be in HH:MM AM/PM format."
    );
  }

  // Validating date (example: should be in M/D/YYYY format)
  if (!dateRegex.test(showtime.date)) {
    return handleBadRequest(
      res,
      "Invalid date format. Date should be in M/D/YYYY format."
    );
  }

  // Checking for incomplete or missing fields
  if (
    !showtime.language ||
    !showtime.screen ||
    showtime.movie._id.length !== 24
  ) {
    return handleIncompleteError(res);
  }

  // Checking if the movie with the specified _id exists in the database
  const movieExists = await Movie.findById(showtime.movie._id);

  // If movie does not exist or title does not match, returning not found error
  if (!movieExists || movieExists.title !== showtime.movie.title) {
    return handleNotFoundError(res, "Movie not found");
  }

  // Moving to controller
  next();
};

export default ValidateShowtimeData;
