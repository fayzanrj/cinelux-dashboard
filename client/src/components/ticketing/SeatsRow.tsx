import Seat from "./Seat";

// Props
interface SeatRowProps {
  row: string[];
  handleOnClick: (seat: string) => void;
  booked: Set<string>;
  selectedSeats: Set<string>;
}

const SeatsRow: React.FC<SeatRowProps> = ({
  handleOnClick,
  row,
  booked,
  selectedSeats,
}) => (
  <div className="flex items-center lg:justify-center">
    {/* ROW CODE */}
    <p className="mr-6 text-lg font-semibold">{row[0].charAt(0)}</p>
    {row.map((seat) => (
      <Seat
        key={seat}
        seat={seat}
        isBooked={booked.has(seat)}
        isSelected={selectedSeats.has(seat)}
        onClick={handleOnClick}
      />
    ))}
    <p className="ml-6 text-lg font-semibold">{row[0].charAt(0)}</p>
  </div>
);

export default SeatsRow;
