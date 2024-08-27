import { stripe } from "../index.js";
import {
  checkBookingStatus,
  findBookingAndShowtime,
  updateShowtimeBookedSeats,
} from "../libs/bookingHelpers.js";
import { validateEmail } from "../libs/RegexFunctions.js";
import { SendBookingEmail } from "../libs/SendBookingEmail.js";
import {
  handleBadRequest,
  handleInternalError,
  handleNotFoundError,
} from "../libs/ThrowErrors.js";
import Booking from "../models/BookingModel.js";
import BookingNumber from "../models/BookingNumberModel.js";
import Showtime from "../models/ShowtimeModel.js";

// Function to find bookings and send back
export const getBookings = async (req, res) => {
  try {
    // Destruturing
    const { email } = req.query;

    // Validating email
    if (!validateEmail(email)) {
      return handleBadRequest(
        res,
        "Invalid data. Please refresh the page and try again."
      );
    }

    // Finding bookings
    const bookings = await Booking.find({
      customerEmail: email,
    });

    // Response
    return res.status(200).json({ bookings });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// Function to find all bookings and send back
export const getAllBookings = async (req, res) => {
  try {
    // Finding bookings
    const bookings = await Booking.find();

    // Response
    return res.status(200).json({ bookings });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// Function to create a booking and initialise payment session
export const bookTickets = async (req, res) => {
  try {
    // Destructuring request
    const { id: showtimeId } = req.params;
    const {
      user: { name, email },
      seats,
    } = req.body;

    // Validating user data
    if (!validateEmail(email) || !name) {
      return handleBadRequest(
        res,
        "Invalid data. Please refresh the page and try again."
      );
    }

    // Finding showtime
    const showtime = await Showtime.findById(showtimeId);
    if (!showtime) return handleNotFoundError(res, "Show not found");

    // Checking if any ticket is already booked
    const alreadyBooked = seats.filter((seat) =>
      showtime.booked.includes(seat)
    );
    if (alreadyBooked.length > 0) {
      return handleBadRequest(
        res,
        `${alreadyBooked.join(", ")} has already been booked`
      );
    }

    // Extracting latest booking number and incrementing it
    const latestBookingNumber = await BookingNumber.findOne();
    const newBookingNumber = latestBookingNumber.number + 1;

    // Initialising a booking object in database
    const booking = await Booking.create({
      bookingNumber: newBookingNumber,
      date: showtime.date,
      time: showtime.time,
      language: showtime.language,
      screen: showtime.screen,
      showtimeId: showtime.id,
      customerEmail: email,
      customerName: name,
      movie: {
        title: showtime.movie.title,
        poster_path: showtime.movie.poster_path,
      },
      seats,
      status: "paymentRequired",
      isPaid: false,
    });

    // Adding seats
    await updateShowtimeBookedSeats(showtime, seats, "add");
    // Updating booking number in database
    await BookingNumber.findByIdAndUpdate(latestBookingNumber.id, {
      number: newBookingNumber,
    });

    // Initialising payment session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.PAYMENT_SUCCESS_URL}/showtimes/${showtime.id}/tickets/paymentSuccess?bookingId=${booking.bookingNumber}`,
      cancel_url: `${process.env.PAYMENT_SUCCESS_URL}/showtimes/${showtime.id}/tickets/paymentFailed?bookingId=${booking.bookingNumber}`,
      customer_email: email,
      client_reference_id: booking.id,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: parseInt(process.env.TICKET_PRICE || 8) * 100,
            product_data: {
              name: `Seats for ${showtime.movie.title} (${showtime.language})`,
              description: `${seats.join(", ")} for ${showtime.date} at ${
                showtime.time
              }. Use following card details \n Card number : 4242 4242 4242 4242 \n Expiry Date : 12/34 \n CVV : 567`,
            },
          },
          quantity: seats.length,
        },
      ],
    });

    // Adding payment session id in booking object
    await Booking.findByIdAndUpdate(booking.id, {
      paymentSessionId: session.id,
    });

    // Response
    return res.status(200).json({ session });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// Function to verify booking after payment is completed
export const verifyBooking = async (req, res) => {
  try {
    // Destructuring
    const { bookingId } = req.params;

    // Finding booking object in database
    const { booking } = await findBookingAndShowtime(bookingId);

    // Checking booking's status
    const isAlreadyChecked = checkBookingStatus(booking);
    if (isAlreadyChecked) return res.status(403).send("forbidden");

    // If booking's payment is not paid and booking's status is requiredPayment (i.e. Booking is failed)
    if (!booking.isPaid && booking.status === "paymentRequired") {
      // Then we cannot verify the booking, so we return error that redirects client to failedPayment page from client side
      return handleBadRequest(res, "Invalid Booking");
    }

    // Updating booking status as verified
    booking.status = "verified";
    await booking.save();

    // Response
    return res.status(200).json({ message: "Verified" });
  } catch (error) {
    console.error(error);
    if (error.message === "No booking found") {
      handleNotFoundError(res, error.message);
    } else {
      handleInternalError(res);
    }
  }
};

// Function to update booking if failed
export const bookingFailed = async (req, res) => {
  try {
    // Destructuring
    const { bookingId } = req.params;

    // Getting booking and showtime object from database
    const { booking, showtime } = await findBookingAndShowtime(bookingId);

    // Checking booking's status
    const isAlreadyChecked = checkBookingStatus(booking);
    if (isAlreadyChecked) return res.status(403).send("forbidden");

    // If bookings payment is paid then we return an error that redirects client to paymentSuccess page from client side
    if (booking.isPaid) return handleBadRequest(res, "Invalid Request");

    // Removing booking seats from showtime's booked seats
    if (showtime) {
      await updateShowtimeBookedSeats(showtime, booking.seats, "remove");
    }

    // Deleting the booking after updating the status
    await booking.deleteOne();

    // Response
    return res.status(200).json({ message: "Updated status" });
  } catch (error) {
    console.error(error);
    if (error.message === "No booking found") {
      handleNotFoundError(res, error.message);
    } else {
      handleInternalError(res);
    }
  }
};

export const handleStripeWebhook = async (req, res) => {
  // Extracting signature header
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // Verifying
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`⚠️  Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Getting session and booking object from database
  const session = event.data.object;
  const booking = await Booking.findById(session.client_reference_id);
  // Finding showtime
  const showtime = await Showtime.findById(booking.showtimeId);

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        if (booking) {
          // Updating booking's payment status
          booking.isPaid = true;
          await booking.save();

          if (showtime)
            await SendBookingEmail(
              booking.customerEmail,
              booking.customerName,
              showtime,
              booking.seats
            );
        }
        break;
      case "checkout.session.async_payment_failed":
      case "checkout.session.expired":
        if (booking) {
          if (showtime) {
            // Removing seats from showtime
            await updateShowtimeBookedSeats(showtime, booking.seats, "remove");
          }
          await booking.deleteOne();
        }
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error("Error handling webhook event:", error);
  }

  res.json({ received: true });
};
