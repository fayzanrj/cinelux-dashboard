import React, { useState } from "react";
import BookingProps from "../../props/BookingsProps";
import { Link } from "react-router-dom";
import PrintTickets from "../ticketing/PrintTickets";
import ButtonLayout from "../shared/ButtonLayout";

const BookingsListItem: React.FC<BookingProps> = ({
  movie,
  language,
  date,
  time,
  screen,
  seats,
  bookingNumber,
  customerEmail,
  customerName,
  showtimeId,
}) => {
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open and close modal
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <div className="p-2 border border-gray-600 rounded-md w-full my-2">
      {/* BOOKING ID */}
      <p className="font-semibold">Booking#{bookingNumber}</p>

      <div className="my-3">
        {/* Show id */}
        <p className="font-semibold">
          ShowId#{showtimeId}{" "}
          <Link
            to={`/showtimes/${showtimeId}`}
            className="text-sm underline text-blue-500"
          >
            See show
          </Link>
        </p>

        {/* Movie title */}
        <h3 className="font-bold break-words text-lg">
          {movie.title}{" "}
          <span className="font-normal text-sm">({language})</span>
        </h3>

        {/* Show details */}
        <p className="text-sm mt-1 break-words">
          {date} - {time} - {screen}
        </p>
      </div>

      <div className="my-4">
        {/* Customer details */}
        <p className="break-words">Name : {customerName}</p>
        <p className="break-words">Email : {customerEmail}</p>

        {/* Bookings details */}
        <p className="break-words">Seat No. : {seats.join(", ")}</p>
      </div>

      <ButtonLayout onClick={toggleModal}>Print Tickets</ButtonLayout>

      {isModalOpen && (
        <PrintTickets
          closeModal={toggleModal}
          date={date}
          movie={movie}
          language={language}
          time={time}
          screen={screen}
          selectedSeats={new Set(seats)}
        />
      )}
    </div>
  );
};

export default BookingsListItem;
