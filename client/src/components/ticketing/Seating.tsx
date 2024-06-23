import React, { useCallback } from "react";
import Seats from "../../constants/Seats";
import Seat from "./Seat";
import SeatsRow from "./SeatsRow";

// Props
interface SeatingProps {
  booked: Set<string>;
  selectedSeats: Set<string>;
  setSelectedSeats: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const Seating: React.FC<SeatingProps> = ({
  booked,
  selectedSeats,
  setSelectedSeats,
}) => {
  // Function to select and unselect a seat
  const handleOnClick = useCallback((seat: string) => {
    setSelectedSeats((prev) => {
      const newSelectedSeatss = new Set(prev);
      if (newSelectedSeatss.has(seat)) {
        newSelectedSeatss.delete(seat);
      } else {
        newSelectedSeatss.add(seat);
      }
      return newSelectedSeatss;
    });
  }, []);

  return (
    <section className="w-full my-16">
      {/* EACH SEATS ROW WITH SEATS */}
      {Seats.map((row) => (
        <SeatsRow
          key={row[0].charAt(0)}
          row={row}
          handleOnClick={handleOnClick}
          booked={booked}
          selectedSeats={selectedSeats}
        />
      ))}

      {/* SEAT COLOR INFORMATION */}
      <SeatsVariantInfo />

      {/* SELECTED SEATS */}
      <div>
        <p>Selected Seats: {[...selectedSeats].join(", ")}</p>
      </div>
    </section>
  );
};

export default Seating;

// Seat color information
const SeatsVariantInfo = () => (
  <div className="flex justify-center gap-4 my-4">
    <div className="text-center">
      <Seat isBooked isSelected={false} seat="" />
      <p>Booked</p>
    </div>
    <div className="text-center">
      <Seat isBooked={false} isSelected seat="" />
      <p>Selected</p>
    </div>
    <div className="text-center">
      <Seat isBooked={false} isSelected={false} seat="" />
      <p>Available</p>
    </div>
  </div>
);
