import Booking from "../models/BookingModel.js";
import Showtime from "../models/ShowtimeModel.js";

// Function to find and return booking and showtime object
export const findBookingAndShowtime = async (bookingId) => {
  const booking = await Booking.findOne({ bookingNumber: parseInt(bookingId) });
  if (!booking) throw new Error("No booking found");

  const showtime = await Showtime.findById(booking.showtimeId);
  if (!showtime) throw new Error("No show found");
  return { booking, showtime };
};

// Function to add and remove seats from showtime booked
export const updateShowtimeBookedSeats = async (
  showtime,
  seats,
  variant = "add"
) => {
  if (variant === "add") {
    showtime.booked.push(...seats);
  } else if (variant === "remove") {
    showtime.booked = showtime.booked.filter((seat) => !seats.includes(seat));
  }
  await Showtime.findByIdAndUpdate(showtime.id, { ...showtime });
};

// Function to handle booking status checks
export const checkBookingStatus = (booking, res, message) => {
  // If booking's payment is paid and booking status is verified (i.e. booking is already verified)
  // OR if booking's payment is not paid and booking status is paymentFailed (i.e. booking is already failed)
  if (booking.isPaid && booking.status === "verified") {
    return true;
  }
};
