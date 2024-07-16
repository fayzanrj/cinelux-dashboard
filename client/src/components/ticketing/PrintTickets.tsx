import getBgColor from "../../libs/GetBgColor";
import {
  ScreenProps,
  TimeProps,
} from "../../props/ShowtimeProps";
import ButtonLayout from "../shared/ButtonLayout";
import ScreenModal from "../shared/ScreenModal";

// Props
interface PrintTicketsProps {
  closeModal: () => void;
  selectedSeats: Set<string>;
  time: TimeProps;
  date: string;
  screen: ScreenProps;
  language: string;
  movie: {
    _id?: string;
    title: string;
  };
}

const PrintTickets: React.FC<PrintTicketsProps> = ({
  closeModal,
  selectedSeats,
  date,
  language,
  movie,
  screen,
  time,
}) => {
  // Function to handle print
  const handlePrint = () => window.print();

  return (
    <ScreenModal isSimpleModal>
      <section className="w-[95%] max-w-96 max-h-svh overflow-y-auto">
        <div className="NO_PRINT">
          <ButtonLayout onClick={handlePrint}>Print Tickets</ButtonLayout>
          <ButtonLayout
            onClick={closeModal}
            background="danger"
            className="mx-1"
          >
            Close
          </ButtonLayout>
        </div>

        {[...selectedSeats].map((seat) => (
          <div
            className="w-full p-4 my-2 rounded-lg "
            style={getBgColor("primary")}
          >
            <p>
              {date} - {time}
            </p>
            <p>
              {screen} - {movie.title} ({language})
            </p>
            <p className="my-6 text-3xl text-center">Seat#{seat}</p>
          </div>
        ))}
      </section>
    </ScreenModal>
  );
};

export default PrintTickets;
