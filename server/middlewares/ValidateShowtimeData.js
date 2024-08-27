import { validateDate, validateTime } from "../libs/RegexFunctions.js";
import {
  handleIncompleteError,
  handleNotFoundError,
} from "../libs/ThrowErrors.js";
import Movie from "../models/MovieModel.js";

const ValidateShowtimeData = async (req, res, next) => {
  const showtime = req.body;

  // Validating time (example: should be in HH:MM AM/PM format)
  if (!validateTime(showtime.time)) {
    return handleBadRequest(
      res,
      "Invalid time format. Time should be in HH:MM AM/PM format."
    );
  }

  // Validating date (example: should be in M/D/YYYY format)
  if (!validateDate(showtime.date)) {
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

  req.body.movie = movieExists;
  // Moving to controller
  next();
};

export default ValidateShowtimeData;
