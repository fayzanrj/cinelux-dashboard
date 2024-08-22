import filterShowtimes from "../libs/filterShowtimes.js";
import { validateDate } from "../libs/RegexFunctions.js";
import sortShowsByDate from "../libs/SortShowsByDate.js";
import sortShowsByTime from "../libs/SortShowsByTime.js";
import {
  handleBadRequest,
  handleInternalError,
  handleNotFoundError,
} from "../libs/ThrowErrors.js";
import Movie from "../models/MovieModel.js";
import Showtime from "../models/ShowtimeModel.js";

// Controller to add a new showtime
export const addShowtime = async (req, res) => {
  try {
    const data = req.body;

    // Creating a new showtime
    const showtime = await Showtime.create({
      ...data,
    });

    if (!showtime) return handleInternalError(res);

    // Response
    return res.status(200).json({
      message: "Showtime has been added",
      showtime,
    });
  } catch (error) {
    console.error(error);
    return handleInternalError(res);
  }
};

// Controller to get a showtime by ID
export const getShowtime = async (req, res) => {
  try {
    const id = req.params.id;

    // Finding showtime by ID
    const showtime = await Showtime.findById(id);
    if (!showtime) return handleNotFoundError(res, "Showtime not found");

    // Finding associated movie
    const movie = await Movie.findById(showtime.movie._id);
    if (!movie) return handleNotFoundError(res, "Movie not found");

    // Response
    return res.status(200).json({ showtime, movie });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// Controller to get all showtimes for a specific date
export const getShowtimesbyDate = async (req, res) => {
  try {
    const date = req.params.date;

    // Validating date format
    if (!validateDate(date)) {
      return handleBadRequest(
        res,
        "Invalid date format. Date should be in DD-MM-YYYY format."
      );
    }

    // Finding showtimes by date
    const showtimes = await Showtime.find({
      date,
    });

    const sortedShowtimes = sortShowsByTime(showtimes);

    // Response
    return res.status(200).json({ showtimes: sortedShowtimes });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};
// Controller to get only showtimes for a specific movie
export const getShowtimesByMovieId = async (req, res) => {
  try {
    const movieId = req.params.id;
    const { startingDate } = req.query;

    // Validating date format
    if (!validateDate(startingDate)) {
      return handleBadRequest(
        res,
        "Invalid date format. Date should be in DD-MM-YYYY format."
      );
    }

    // Finding showtimes by movie ID
    const showtimes = await Showtime.find({
      "movie._id": movieId,
    });

    // Filtering showtimes to include only those with dates on or after the input date
    const filteredShowtimes = filterShowtimes(showtimes, startingDate);

    const sortedShowtimes = sortShowsByDate(filteredShowtimes);

    // Response
    return res.status(200).json({ showtimes: sortedShowtimes });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// Controller to get showtimes and movie information for a specific movie
export const getShowtimesAndMovieInfoById = async (req, res) => {
  try {
    const movieId = req.params.id;
    const { startingDate } = req.query;

    // Validating date format
    if (!validateDate(startingDate)) {
      return handleBadRequest(
        res,
        "Invalid date format. Date should be in DD-MM-YYYY format."
      );
    }

    const movie = await Movie.findById(movieId);
    if (!movie) return handleNotFoundError(res, "Movie not found");

    // Finding showtimes by movie ID
    const showtimes = await Showtime.find({
      "movie._id": movieId,
    });

    // Filtering showtimes to include only those with dates on or after the input date
    const filteredShowtimes = filterShowtimes(showtimes, startingDate);

    const sortedShowtimes = sortShowsByDate(filteredShowtimes);

    // Response
    return res.status(200).json({ showtimes: sortedShowtimes, movie });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// Controller to get all showtimes
export const getAllShowtimes = async (req, res) => {
  try {
    // Finding all showtimes
    const showtimes = await Showtime.find();

    // Response
    return res.status(200).json({ showtimes });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// Controller to delete a showtime by ID
export const deleteShowtime = async (req, res) => {
  try {
    // Deleting showtime by ID
    const deleted = await Showtime.findByIdAndDelete(req.params.id);

    if (!deleted) return handleNotFoundError(res, "Showtime not found");

    // Response
    return res.status(200).json({
      message: "Showtime has been deleted",
    });
  } catch (error) {
    console.error(error);
    return handleInternalError(res);
  }
};

// Booking tickets for a showtime
export const bookTickets = async (req, res) => {
  try {
    // Finding show
    const showtime = await Showtime.findById(req.params.id);
    if (!showtime) return handleNotFoundError(res, "Showtime not found");

    // Initializing booking process
    if (!showtime.booked) {
      showtime.booked = [];
    }

    const { seats } = req.body;

    // Checking if seats are already booked
    const alreadyBooked = seats.filter((seat) =>
      showtime.booked.includes(seat)
    );

    if (alreadyBooked.length > 0) {
      const seatsString = alreadyBooked.join(", ");
      return handleBadRequest(res, `${seatsString} has already been booked`);
    }

    // Adding booked seats to showtime
    showtime.booked.push(...seats);
    const updatedShowtime = await Showtime.findByIdAndUpdate(
      showtime.id,
      showtime,
      { new: true }
    );

    if (!updatedShowtime) return handleInternalError(res);

    // Response
    return res.status(200).json({
      message: "Seats have been booked",
    });
  } catch (error) {
    console.error(error);
    return handleInternalError(res);
  }
};
