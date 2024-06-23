import { useState } from "react";
import SearchMovieImdbModal from "../movies/SearchMovieImdbModal";
import AddUserModal from "../users/AddUserModal";
import ButtonLayout from "./ButtonLayout";
import AddShowTimeModal from "../showtimes/AddShowTimeModal";

// Props
interface AddNewButtonProps {
  variant: "MOVIE" | "USER" | "SHOWTIME";
  label?: string;
  background?: "primary" | "danger" | "transparent";
}

const AddNewButton: React.FC<AddNewButtonProps> = ({
  variant,
  label,
  background = "primary",
}) => {
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open and close modal
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  // Function to render modal according to variant
  const renderModal = () => {
    switch (variant) {
      case "MOVIE":
        return <SearchMovieImdbModal closeModal={toggleModal} />;
      case "USER":
        return <AddUserModal closeModal={toggleModal} />;
      case "SHOWTIME":
        return <AddShowTimeModal closeModal={toggleModal} />;
      default:
        return null;
    }
  };

  // Function to render button text according to variant
  const renderText = () => {
    if (label) {
      return label;
    } else {
      switch (variant) {
        case "MOVIE":
          return "Add New Movie";
        case "USER":
          return "Add New User";
        case "SHOWTIME":
          return "Add New Showtime";
        default:
          return null;
      }
    }
  };
  return (
    <>
      {isModalOpen && renderModal()}

      {/* BUTTON */}
      <div className="text-right">
        <ButtonLayout onClick={toggleModal} background={background}>
          {renderText()}
        </ButtonLayout>
      </div>
    </>
  );
};

export default AddNewButton;
