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

// Route to verify payments
router.post(
  "/stripeWebhook",
  bodyParser.raw({ type: "application/json" }),
  bookingControllers.handleStripeWebhook
);

export default router;
