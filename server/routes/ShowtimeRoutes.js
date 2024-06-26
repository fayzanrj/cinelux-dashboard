// Import necessary modules and middleware
import express from "express";
import * as showtimeControllers from "../controllers/ShowtimeControllers.js";
import AuthorizeMiddleware from "../middlewares/AuthorizeMiddleware.js";
import IsValidIdMiddle from "../middlewares/IsValidIdMiddle.js";
import UserAuthorizeMiddleware from "../middlewares/UserAuthorizeMiddleware.js";
import ValidateShowtimeData from "../middlewares/ValidateShowtimeData.js";

// Router object
const router = express.Router();

// Route to add a new showtime, requires authorization
router.post(
  "/add",
  AuthorizeMiddleware,
  ValidateShowtimeData,
  showtimeControllers.addShowtime
);

// Route to get a showtime by ID, requires user authorization
router.get(
  "/getShowtime/:id",
  UserAuthorizeMiddleware,
  IsValidIdMiddle,
  showtimeControllers.getShowtime
);

// Route to get showtimes by date, requires user authorization
router.get(
  "/getShowtimesByDate/:date",
  UserAuthorizeMiddleware,
  showtimeControllers.getShowtimesbyDate
);

router.get(
  "/getShowtimesByMovieId/:id",
  UserAuthorizeMiddleware,
  IsValidIdMiddle,
  showtimeControllers.getShowtimesbyMovieId
);

// Route to get all showtimes, requires authorization
router.get(
  "/getAllShowtimes",
  AuthorizeMiddleware,
  showtimeControllers.getAllShowtimes
);

// Route to delete a showtime by ID, requires authorization
router.delete(
  "/delete/:id",
  AuthorizeMiddleware,
  IsValidIdMiddle,
  showtimeControllers.deleteShowtime
);

// Route to book tickets for a showtime by ID, requires authorization
router.put(
  "/tickets/book/:id",
  AuthorizeMiddleware,
  IsValidIdMiddle,
  showtimeControllers.bookTickets
);

export default router;
