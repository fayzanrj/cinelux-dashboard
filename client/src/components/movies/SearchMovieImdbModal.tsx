import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormLayout from "../shared/FormLayout";
import ScreenModal from "../shared/ScreenModal";
import StateInputField from "../shared/StateInputField";

// Props
interface SearchMovieImdbModalProps {
  closeModal: () => void;
}

const SearchMovieImdbModal: React.FC<SearchMovieImdbModalProps> = ({
  closeModal,
}) => {
  //State
  const [imdbId, setImdbId] = useState("");
  // Hook
  const nav = useNavigate();

  // Function to change imdb id
  const handleOnChange = (text: string) => setImdbId(text);

  // Function to push to add page
  const redirect = (e: React.FormEvent) => {
    e.preventDefault();
    closeModal();
    nav(`/movies/add?imdb=${imdbId}`);
  };

  return (
    <ScreenModal closeModal={closeModal} isForm showCancel>
      <FormLayout
        handleSubmit={redirect}
        isLoading={false}
        variant="FIND MOVIE"
      >
        <StateInputField
          id="searchIMDB"
          label="Search IMDB"
          placeholder="Enter IMDB ID"
          onChange={handleOnChange}
        />
      </FormLayout>
    </ScreenModal>
  );
};

export default SearchMovieImdbModal;
