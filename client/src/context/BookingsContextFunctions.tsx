import axios from "axios";
import { useState } from "react";
import useHeaders from "../hooks/useHeaders";
import { handleApiError } from "../libs/HandleApiError";
import BookingProps from "../props/BookingsProps";

export const useBookingsFunctions = () => {
  // States
  const [bookings, setBookings] = useState<BookingProps[] | null>(null);
  const [isFetchingBookings, setIsFetchingBookings] = useState(true);

  const headers = useHeaders();

  // Function to fetch bookings
  const FetchBookings = async () => {
    try {
      setIsFetchingBookings(true);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_HOST}/api/v1/bookings/getAllBookings`,
        {
          headers,
        }
      );
      setBookings(res.data.bookings);
    } catch (error) {
      handleApiError(error);
      setBookings(null);
    } finally {
      setIsFetchingBookings(false);
    }
  };

  return {
    bookings,
    isFetchingBookings,
    FetchBookings,
  };
};
