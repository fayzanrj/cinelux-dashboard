import express from "express";
import UserAuthorizeMiddleware from "../middlewares/UserAuthorizeMiddleware.js";
import * as paymentControllers from "../controllers/BookingController.js";
import IsValidIdMiddle from "../middlewares/IsValidIdMiddle.js";

// Router object
const router = express.Router();

// Route to book tickets, checks for user authorization and valid showtime id
router.post(
  "/bookTickets/:id",
  UserAuthorizeMiddleware,
  IsValidIdMiddle,
  paymentControllers.bookTickets
);

export default router;
