import {
  handleInternalError,
  handleNotFoundError,
} from "../libs/ThrowErrors.js";
import Stripe from "stripe";
import Showtime from "../models/ShowtimeModel.js";
import Booking from "../models/BookingModel.js";

export const bookTickets = async (req, res) => {
  try {
    const showtimeId = req.params.id;

    // Destructuring
    const { user, seats } = req.body;

    // Finding show
    const showtime = await Showtime.findById(showtimeId);

    // If show not found
    if (!showtime) {
      return handleNotFoundError("Show not found");
    }

    // Checking if seats are already booked
    const alreadyBooked = seats.filter((seat) =>
      showtime.booked.includes(seat)
    );

    if (alreadyBooked.length > 0) {
      const seatsString = alreadyBooked.join(", ");
      return handleBadRequest(res, `${seatsString} has already been booked`);
    }

    // Booking tickets
    const booking = await Booking.create({
      date: showtime.date,
      time: showtime.time,
      language: showtime.language,
      screen: showtime.screen,
      customerEmail: user.email,
      customerName: user.name,
      movie: {
        title: showtime.movie.title,
      },
      seats,
    });

    // Creating stripe instance
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Creating payment session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.PAYMENT_SUCCESS_URL}/showtimes/${showtime.id}/tickets/paymentSuccess?bookingId=${booking.id}`,
      cancel_url: `${process.env.PAYMENT_SUCCESS_URL}/showtimes/${showtime.id}/tickets/paymentFailed?bookingId=${booking.id}`,
      customer_email: user.email,
      client_reference_id: showtime.id,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: process.env.TICKET_PRICE * 1000,
            product_data: {
              name: `Seats for ${showtime.movie.title} (${showtime.language})`,
              description: `${seats.join(",")} for ${showtime.date} at ${
                showtime.time
              }`,
            },
          },
          quantity: seats.length,
        },
      ],
    });

    // Updating showtime seats
    showtime.booked.push(...seats);
    await Showtime.findByIdAndUpdate(showtime.id, { ...showtime });

    // Responses
    return res.status(200).json({ session });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};
