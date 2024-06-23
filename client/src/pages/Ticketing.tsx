import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../components/shared/Error";
import ScreenLoader from "../components/shared/ScreenLoader";
import SidebarLayout from "../components/sidebar/SidebarLayout";
import Seating from "../components/ticketing/Seating";
import useUserHeaders from "../hooks/useUserHeaders";
import { handleApiError } from "../libs/HandleApiError";
import ShowtimeProps from "../props/ShowtimeProps";
import BookTickets from "../components/ticketing/BookTickets";

const Ticketing = () => {
  // States
  const [showtime, setShowtime] = useState<ShowtimeProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());

  // Hooks
  const { id } = useParams<{ id: string }>();
  const headers = useUserHeaders();

  // Function to run after booking is completed
  const onBooking = () => {
    if (showtime && showtime.booked) {
      showtime.booked?.push(...selectedSeats);
    } else {
      showtime!.booked = [...selectedSeats];
    }
    setSelectedSeats(new Set());
  };

  useEffect(() => {
    // Function to fetch latest showtime data with seats
    const fetchShowtime = async () => {
      if (!id || id.length !== 24) {
        setIsLoading(false);
        return;
      }

      try {
        // API CALL
        const res = await axios.get(
          `${
            import.meta.env.VITE_SERVER_HOST
          }/api/v1/showtimes/getShowtime/${id}`,
          { headers }
        );
        setShowtime(res.data.showtime);
      } catch (error) {
        handleApiError(error);
      } finally {
        setIsLoading(false);
      }
    };

    // Calling function
    fetchShowtime();
  }, [id, headers]);

  // If there is no show id
  if (!isLoading && (!id || id.length !== 24)) {
    return (
      <SidebarLayout showBack>
        <Error />
      </SidebarLayout>
    );
  }

  // If page is loading
  if (isLoading) {
    return (
      <SidebarLayout>
        <ScreenLoader />
      </SidebarLayout>
    );
  }

  // If no showtime is found
  if (!showtime) {
    return (
      <SidebarLayout showBack>
        <Error />
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout
      pageName={`${showtime.movie.title} Tickets`}
      showBack
      className="min-w-[65rem]"
    >
      <ShowtimeTicktingDetails key={showtime._id} {...showtime} />
      <Screen />
      <Seating
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
        booked={new Set(showtime.booked || [])}
      />
      <BookTickets
        selectedSeats={selectedSeats}
        onBooking={onBooking}
        showtime={showtime}
      />
    </SidebarLayout>
  );
};

export default Ticketing;

// Showtime details
const ShowtimeTicktingDetails: React.FC<ShowtimeProps> = ({
  date,
  language,
  movie,
  screen,
  time,
}) => (
  <section className="mt-2 mb-6 text-lg text-center">
    {date} &#8208; {time} &#8208; {screen} &#8208; {movie.title} ({language})
  </section>
);

// Cinema screen
const Screen = () => (
  <section>
    <p className="text-center">Screen</p>
    <div className="screen"></div>
  </section>
);
