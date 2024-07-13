import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import env from "dotenv";
import express from "express";
import connectToDB from "./connectToDB.js";
import adminRoutes from "./routes/AdminRoutes.js";
import bookingRoutes from "./routes/BookingRoutes.js";
import codeRoutes from "./routes/CodeRoutes.js";
import movieRoutes from "./routes/MovieRoutes.js";
import showtimeRoutes from "./routes/ShowtimeRoutes.js";
import Stripe from "stripe";
import BookingNumber from "./models/BookingNumberModel.js";

// Loading environment variables from .env file
env.config();

// Initialising Express App
const app = express();
// Enabling CORS middleware

// Enabling CORS middleware
app.use(cors());

// Initialising stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware to parse JSON bodies of requests
app.use((req, res, next) => {
  if (req.originalUrl === "/api/v1/bookings/stripeWebhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Middleware to parse cookies
app.use(cookieParser());

// Connecting to MongoDB
connectToDB();

// Defining routes for admin-related endpoints
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/showtimes", showtimeRoutes);
app.use("/api/v1/userAuth", codeRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/", (req, res) => res.status(200).json({ message: "API WORKING" }));

// Starting the server
app.listen(8080, () => {
  console.log("Server running at 8080");
});

export default app;