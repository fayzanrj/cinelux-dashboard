import express from "express";
import UserAuthorizeMiddleware from "../middlewares/UserAuthorizeMiddleware.js";
import * as bookingControllers from "../controllers/BookingControllers.js";
import IsValidIdMiddle from "../middlewares/IsValidIdMiddle.js";
import bodyParser from "body-parser";

// Router object
const router = express.Router();

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
