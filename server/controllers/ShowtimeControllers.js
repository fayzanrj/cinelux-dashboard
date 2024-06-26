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
        "Invalid date format. Date should be in DD-MM-YYYY format."
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

// Controller to get  showtimes for a specific movie
export const getShowtimesbyMovieId = async (req, res) => {
  try {
    const movieId = req.params.id;
    const { date } = req.query;

    // Validating date format
    if (!dateRegex.test(date)) {
      return handleBadRequest(
        res,
        "Invalid date format. Date should be in DD-MM-YYYY format."
      );
    }

    const movie = await Movie.findById(movieId);
    if (!movie) return handleNotFoundError(res, "Movie not found");

    // Spliting and converting input date to a comparable format
    const [day, month, year] = date.split("-");
    const inputDate = new Date(year, month - 1, day); // JavaScript months are 0-indexed

    // Finding showtimes by movie ID
    const showtimes = await Showtime.find({
      "movie._id": movieId,
    });

    // Filtering showtimes to include only those with dates on or after the input date
    const filteredShowtimes = showtimes.filter((showtime) => {
      const [showDay, showMonth, showYear] = showtime.date.split("-");
      const showtimeDate = new Date(showYear, showMonth - 1, showDay);
      return showtimeDate >= inputDate;
    });

    // Response
    return res.status(200).json({ showtimes: filteredShowtimes, movie });
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
