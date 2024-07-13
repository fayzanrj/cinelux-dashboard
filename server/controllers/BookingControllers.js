import { stripe } from "../index.js";
import { validateEmail } from "../libs/RegexFunctions.js";
import { handleBadRequest, handleInternalError } from "../libs/ThrowErrors.js";
import Booking from "../models/BookingModel.js";
import Showtime from "../models/ShowtimeModel.js";

export const bookTickets = async (req, res) => {
  try {
    // Destructuring
    const showtimeId = req.params.id;
    const { user, seats } = req.body;
    const { name, email } = user;

    // Validating User
    const isValidEmail = validateEmail(email);
    if (!isValidEmail || !name) {
      return handleBadRequest(
        res,
        "Invalid data. Kindly, refresh page and try again"
      );
    }

    // Finding show
    const showtime = await Showtime.findById(showtimeId);
    if (!showtime) {
      return handleNotFoundError(res, "Show not found");
    }

    // Checking if seats are already booked
    const alreadyBooked = seats.filter((seat) =>
      showtime.booked.includes(seat)
    );
    if (alreadyBooked.length > 0) {
      const seatsString = alreadyBooked.join(", ");
      return handleBadRequest(res, `${seatsString} has already been booked`);
    }

    // Creating Booking
    const booking = await Booking.create({
      date: showtime.date,
      time: showtime.time,
      language: showtime.language,
      screen: showtime.screen,
      showtimeId: showtime.id,
      customerEmail: user.email,
      customerName: user.name,
      movie: {
        title: showtime.movie.title,
      },
      seats,
      isPaid: false,
    });

    // Saving booked seats
    showtime.booked.push(...booking.seats);
    await showtime.save();

    // Creating stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.PAYMENT_SUCCESS_URL}/showtimes/${showtime.id}/tickets/paymentSuccess?bookingId=${booking.id}`,
      cancel_url: `${process.env.PAYMENT_SUCCESS_URL}/showtimes/${showtime.id}/tickets/paymentFailed?bookingId=${booking.id}`,
      customer_email: user.email,
      client_reference_id: booking.id,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: parseInt(process.env.TICKET_PRICE || 8) * 100,
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

    // Adding session id in booking
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

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  // Verifying webhook
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`⚠️  Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Getting session and acting accordingly
  const session = event.data.object;
  // Find booking object
  const booking = await Booking.findById(session.client_reference_id);
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      try {
        if (booking) {
          booking.isPaid = true;
          await booking.save();
        }
      } catch (error) {
        console.error("Error updating booking:", error);
      }
      break;
    case "checkout.session.async_payment_failed":
    case "checkout.session.expired":
      if (booking) {
        const showtime = await Showtime.findById(booking.showtimeId);
        if (showtime) {
          // Removing the seats from the showtime's booked seats
          showtime.booked = showtime.booked.filter(
            (seat) => !booking.seats.includes(seat)
          );
          await showtime.save();
        }
      }

    // Handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};
