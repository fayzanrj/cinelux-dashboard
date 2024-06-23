import axios from "axios";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import useHeaders from "../../hooks/useHeaders";
import useLogout from "../../hooks/useLogout";
import { handleApiError } from "../../libs/HandleApiError";
import ButtonLayout from "../shared/ButtonLayout";
import ConfirmationModal from "../shared/ConfirmationModal";
import ScreenLoader from "../shared/ScreenLoader";
import { useAppContext } from "../../context/AppContext";

// Account variant props
interface DeleteAccountProps {
  variant: "ACCOUNT";
}

//  Showtime variant props
interface DeleteShowtimeProps {
  variant: "SHOWTIME";
  showtimeId: string;
  movieTitle: string;
  time: string;
}

// Movie variant props
interface DeleteMovieProps {
  variant: "MOVIE";
  movieId: string;
  movieTitle: string;
}

//  Delete button props
type DeleteButtonProps =
  | DeleteMovieProps
  | DeleteAccountProps
  | DeleteShowtimeProps;

const DeleteButton: React.FC<DeleteButtonProps> = ({ variant, ...props }) => {
  // Title and id
  const movieId = (props as DeleteMovieProps).movieId;
  const movieTitle = (
    (props as DeleteMovieProps) || (props as DeleteShowtimeProps)
  ).movieTitle;
  const showtimeId = (props as DeleteShowtimeProps).showtimeId;
  const time = (props as DeleteShowtimeProps).time;

  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Hooks
  const headers = useHeaders();
  const LogoutUser = useLogout();
  // Destructuring from app context
  const { DeleteMovie, DeleteShowtime } = useAppContext();

  // Function to open and close modal
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  // Function get route for api call
  const getAPIRoute = () => {
    switch (variant) {
      case "ACCOUNT":
        return "admin/deleteAccount";
      case "MOVIE":
        return `movies/delete/${movieId}`;
      case "SHOWTIME":
        return `showtimes/delete/${showtimeId}`;
    }
  };

  // Function to delete
  const Delete = async () => {
    try {
      setIsModalOpen(false);
      setIsLoading(true);

      // API CALL
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_HOST}/api/v1/${getAPIRoute()}`,
        {
          headers,
        }
      );

      toast.success(res.data.message);
      // Logging user out if user deletes his account
      variant === "ACCOUNT" && LogoutUser();

      // Deleting movie from all movies array
      variant === "MOVIE" && DeleteMovie(movieId);

      // Deleting showtime from all showtimes array
      variant === "SHOWTIME" && DeleteShowtime(showtimeId);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to render modal
  const renderModal = () => {
    switch (variant) {
      case "ACCOUNT":
        return (
          <ConfirmationModal
            variant="ACCOUNT"
            handleClick={Delete}
            closeModal={toggleModal}
          />
        );
      case "MOVIE":
        return (
          <ConfirmationModal
            variant="MOVIE"
            movieTitle={movieTitle}
            handleClick={Delete}
            closeModal={toggleModal}
          />
        );
      case "SHOWTIME":
        return (
          <ConfirmationModal
            variant="SHOWTIME"
            time={time}
            movieTitle={movieTitle}
            handleClick={Delete}
            closeModal={toggleModal}
          />
        );
      default:
        return null;
    }
  };

  // Returns loader if loading
  if (isLoading) return <ScreenLoader />;

  return (
    <>
      {isModalOpen && renderModal()}

      {/* BUTTON */}
      <ButtonLayout
        type="button"
        onClick={toggleModal}
        background="danger"
        className="mx-1 px-2.5"
      >
        <MdDelete size={"1.4rem"} />
      </ButtonLayout>
    </>
  );
};

export default DeleteButton;
