import React, { useEffect, useState } from "react";
import MovieProps from "../../props/MovieProps";
import ScreenModal from "../shared/ScreenModal";
import FormLayout from "../shared/FormLayout";
import SelectInputField from "../shared/SelectInputField";
import { bookingOptions, statusOptions } from "../../constants/SelectOptions";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import useHeaders from "../../hooks/useHeaders";
import ScreenLoader from "../shared/ScreenLoader";
import { handleApiError } from "../../libs/HandleApiError";
import { toast } from "sonner";
import StateInputField from "../shared/StateInputField";

// Props
interface EditMovieModalProps {
  movieId: string;
  closeModal: () => void;
}

const EditMovieModal: React.FC<EditMovieModalProps> = ({
  movieId,
  closeModal,
}) => {
  // States
  const [movie, setMovie] = useState<MovieProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // Hooks
  // Destructuring from app context
  const { allMovies, UpdateMovie, FindMovieById } = useAppContext();
  const headers = useHeaders();

  // Function to change status of the movies
  const changeStatus = (val: string) => {
    if (val === "NOW_SHOWING" || val === "COMING_SOON")
      setMovie((prev) => (prev ? { ...prev, status: val } : null));
  };

  // Function to change booking of the movie
  const changeBooking = (val: string) =>
    setMovie((prev) => (prev ? { ...prev, isBooking: val === "true" } : null));

  // Function to add trailer link
  const changeTrailerLink = (val: string) =>
    setMovie((prev) => prev && { ...prev, trailer_link: val });

  // Function to Edit
  const Edit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (movie) {
        closeModal();
        setIsLoading(true);

        // API CALL
        const res = await axios.put(
          `${import.meta.env.VITE_SERVER_HOST}/api/v1/movies/edit/${
            movie?._id
          }`,
          {
            ...movie,
          },
          {
            headers,
          }
        );

        toast.success(res.data.message);
        // Update selected movie in all movies array
        UpdateMovie(movie);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Use effect to find movie in all movies array
  useEffect(() => {
    const foundMovie = FindMovieById(movieId);
    setMovie(foundMovie);
  }, [movieId, allMovies]);

  // If loading is true
  if (isLoading) return <ScreenLoader />;

  return (
    <ScreenModal closeModal={closeModal} isForm showCancel>
      {movie && (
        <FormLayout
          handleSubmit={Edit}
          isLoading={false}
          variant="UPDATE MOVIE"
        >
          <SelectInputField
            id="STATUS"
            options={statusOptions}
            defaultVal={movie.status}
            onChange={changeStatus}
          />
          <SelectInputField
            id="BOOKING"
            options={bookingOptions}
            defaultVal={movie.isBooking ? "true" : "false"}
            onChange={changeBooking}
          />
          <StateInputField
            id="trailer_link"
            label="Trailer Link"
            placeholder="Add trailer link"
            value={movie.trailer_link}
            onChange={changeTrailerLink}
          />
        </FormLayout>
      )}
    </ScreenModal>
  );
};

export default EditMovieModal;
