import {
  handleBadRequest,
  handleInternalError,
  handleNotFoundError,
} from "../libs/ThrowErrors.js";
import dateRegex from "../libs/dateRegex.js";
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
    if (!dateRegex.test(date)) {
      return handleBadRequest(
        res,
        "Invalid date format. Date should be in M/D/YYYY format."
      );
    }

    // Finding showtimes by date
    const showtimes = await Showtime.find({
      date,
    });

    // Response
    return res.status(200).json({ showtimes });
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
