import axios from "axios";
import MovieProps from "../../props/MovieProps";
import ButtonLayout from "../shared/ButtonLayout";
import { useNavigate } from "react-router-dom";
import useHeaders from "../../hooks/useHeaders";
import { handleApiError } from "../../libs/HandleApiError";
import { useAppContext } from "../../context/AppContext";

// Props
interface SaveMovieButtonProps {
  movie: MovieProps;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SaveMovieButton: React.FC<SaveMovieButtonProps> = ({
  movie,
  setIsLoading,
}) => {
  // Hooks
  // Detructuring from app context
  const { AddMovie } = useAppContext();
  const headers = useHeaders();
  const nav = useNavigate();

  // Function to save movie in database
  const handleSave = async () => {
    try {
      setIsLoading(true);

      // Deleting movie's id i.e. undefined to avoid overwrite in database
      delete movie._id;

      // API CALL
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_HOST}/api/v1/movies/add`,
        {
          ...movie,
        },
        {
          headers,
        }
      );

      // Updating movie's id after saving in databse
      movie._id = res.data.movie._id;

      // Adding movie locally in all movies array
      AddMovie(movie);
      // Navigating back
      nav("/movies");
    } catch (error) {
      console.error(error);
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return <ButtonLayout onClick={handleSave}>Save Movie</ButtonLayout>;
};

export default SaveMovieButton;
