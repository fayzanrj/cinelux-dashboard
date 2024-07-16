import axios from "axios";
import { useState } from "react";
import useUserHeaders from "../hooks/useUserHeaders";
import { handleApiError } from "../libs/HandleApiError";
import MovieProps from "../props/MovieProps";
import ShowtimeProps from "../props/ShowtimeProps";

export const useShowtimesFunctions = () => {
  // States
  const [showtimes, setShowtimes] = useState<ShowtimeProps[] | null>(null);
  const [isFetchingShowtimes, setIsFetchingShowtimes] = useState(true);

  // Header hooks
  const userHeaders = useUserHeaders();

  // Function to fetch all showtimes of a particular date
  const FetchShowtimes = async (date: string) => {
    try {
      setIsFetchingShowtimes(true);
      const res = await axios.get(
        `${
          import.meta.env.VITE_SERVER_HOST
        }/api/v1/showtimes/getShowtimesByDate/${date}`,
        {
          headers: userHeaders,
        }
      );
      setShowtimes(res.data.showtimes);
    } catch (error) {
      console.error("Error fetching shows:", error);
      handleApiError(error);
      setShowtimes(null);
    } finally {
      setIsFetchingShowtimes(false);
    }
  };

  // Function to find a movie by ID
  const FindShowtimeById = (id: string) => {
    if (showtimes) {
      if (!id || id.length !== 24) return null;
      const index = showtimes.findIndex((movie) => movie?._id === id);
      return index > -1 ? showtimes[index] : null;
    }

    return null;
  };

  // Function to fetch showtime by Id from backend
  const FetchShowtimeById = async (id: string) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_SERVER_HOST
        }/api/v1/showtimes/getShowtime/${id}`,
        {
          headers: userHeaders,
        }
      );
      const showtime = res.data.showtime as ShowtimeProps;
      const movie = res.data.movie as MovieProps;
      return { showtime, movie };
    } catch (error) {
      handleApiError(error);
    }
  };

  // Function to add a showtimes in showtimes arrays
  const AddShowtime = (showtime: ShowtimeProps) => {
    setShowtimes((prev) => [...(prev || []), showtime]);
  };

  // Function to remove a showtimes from showtimes arrays
  const DeleteShowtime = (id: string) => {
    setShowtimes((prev) => prev && prev.filter((show) => show._id !== id));
  };
  return {
    showtimes,
    isFetchingShowtimes,
    FetchShowtimes,
    FindShowtimeById,
    FetchShowtimeById,
    AddShowtime,
    DeleteShowtime,
  };
};
