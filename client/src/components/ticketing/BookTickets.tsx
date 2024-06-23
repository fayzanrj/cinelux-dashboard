import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import useHeaders from "../../hooks/useHeaders";
import { handleApiError } from "../../libs/HandleApiError";
import ButtonLayout from "../shared/ButtonLayout";
import ScreenLoader from "../shared/ScreenLoader";
import PrintTickets from "./PrintTickets";
import ShowtimeProps from "../../props/ShowtimeProps";

// Props
interface BookTicketsProps {
  selectedSeats: Set<string>;
  onBooking: () => void;
  showtime: ShowtimeProps;
}

const BookTickets: React.FC<BookTicketsProps> = ({
  selectedSeats,
  onBooking,
  showtime,
}) => {
  // States
  const [isLoading, setIsLoading] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  // Hooks
  const headers = useHeaders();
  const { id } = useParams<{ id: string }>();

  // Fuction to close modal
  const closeModal = () => {
    setIsBooked((prev) => !prev);
    onBooking();
  };

  // Function to handle click
  const handleClick = async () => {
    try {
      setIsLoading(true);

      // API CALL
      const res = await axios.put(
        `${
          import.meta.env.VITE_SERVER_HOST
        }/api/v1/showtimes/tickets/book/${id}`,
        { seats: [...selectedSeats] },
        { headers }
      );

      setIsBooked(true);
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading && <ScreenLoader />}
      {isBooked && (
        <PrintTickets
          closeModal={closeModal}
          selectedSeats={selectedSeats}
          showtime={showtime}
        />
      )}

      <section className="my-10 text-center">
        <ButtonLayout
          onClick={handleClick}
          disabled={selectedSeats.size == 0 || isLoading}
        >
          Book Tickets
        </ButtonLayout>
      </section>
    </>
  );
};

export default BookTickets;
