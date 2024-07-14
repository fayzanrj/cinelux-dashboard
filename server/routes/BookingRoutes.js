import express from "express";
import UserAuthorizeMiddleware from "../middlewares/UserAuthorizeMiddleware.js";
import * as bookingControllers from "../controllers/BookingControllers.js";
import IsValidIdMiddle from "../middlewares/IsValidIdMiddle.js";
import bodyParser from "body-parser";
import AdminAuthorizeMiddleware from "../middlewares/AdminAuthorizeMiddleware.js";

// Router object
const router = express.Router();

// Route to find user bookings, checks for user authorization
router.get(
  "/getBookings",
  UserAuthorizeMiddleware,
  bookingControllers.getBookings
);

// Route to find all bookings, checks for admin authorization
router.get(
  "/getAllBookings",
  AdminAuthorizeMiddleware,
  bookingControllers.getAllBookings
);

// Route to book tickets, checks for user authorization and valid showtime id
router.post(
  "/bookTickets/:id",
  UserAuthorizeMiddleware,
  IsValidIdMiddle,
  bookingControllers.bookTickets
);

// Route to verify booking and update booking status after payment is successfully completed
router.post(
  "/verifyBooking/:bookingId",
  UserAuthorizeMiddleware,
  bookingControllers.verifyBooking
);

// Route to update booking status after payment is failed
router.post(
  "/bookingFailed/:bookingId",
  UserAuthorizeMiddleware,
  bookingControllers.bookingFailed
);

// Route to verify payment status
router.post(
  "/stripeWebhook",
  bodyParser.raw({ type: "application/json" }),
  bookingControllers.handleStripeWebhook
);

export default router;
