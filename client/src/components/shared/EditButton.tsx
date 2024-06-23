import { useState } from "react";
import { MdEdit } from "react-icons/md";
import EditMovieModal from "../movies/EditMovieModal";
import ButtonLayout from "../shared/ButtonLayout";

// Movie variant props
interface EditMovieProps {
  variant: "MOVIE";
  movieId: string;
}

//  Edit button props
type EditButtonProps = EditMovieProps;

const EditButton: React.FC<EditButtonProps> = ({ variant, ...props }) => {
  // id
  const movieId = (props as EditMovieProps).movieId;

  // States
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open and close modal
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  // Function to render modal
  const renderModal = () => {
    switch (variant) {
      case "MOVIE":
        return <EditMovieModal movieId={movieId} closeModal={toggleModal} />;
      default:
        return null;
    }
  };

  return (
    <>
      {isModalOpen && renderModal()}

      {/* BUTTON */}
      <ButtonLayout
        type="button"
        onClick={toggleModal}
        background="transparent"
        className="mx-1"
      >
        <MdEdit size={"1.4rem"} />
      </ButtonLayout>
    </>
  );
};

export default EditButton;
