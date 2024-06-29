import { useEffect, useState } from "react";
import SidebarLayout from "../components/sidebar/SidebarLayout";
import MovieProps from "../props/MovieProps";
import { useAppContext } from "../context/AppContext";
import { useSearchParams } from "react-router-dom";
import Error from "../components/shared/Error";
import ScreenLoader from "../components/shared/ScreenLoader";
import NotFound from "../components/shared/NotFound";
import MovieDetailsSection from "../components/movies/MovieDetailsSection";
import SelectInputField from "../components/shared/SelectInputField";
import { bookingOptions, statusOptions } from "../constants/SelectOptions";
import StateInputField from "../components/shared/StateInputField";

const MovieDetails = () => {
  // States
  const [movie, setMovie] = useState<MovieProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // Hooks
  // Destructuring from app context
  const { allMovies, FindMovieById, isFetchingMovies } = useAppContext();
  // Getting movie id from query params
  const [searchParams, _] = useSearchParams();
  const movieId = searchParams.get("id");

  // Use effect to get movie from all movies array
  useEffect(() => {
    const getMovie = async () => {
      setIsLoading(true);
      if (!isFetchingMovies) {
        try {
          // Finding movie in already fetch movies array
          const foundMovie = FindMovieById(movieId || "");
          setMovie(foundMovie);
        } catch (error) {
          setMovie(null);
        } finally {
          setIsLoading(false);
        }
      }
    };

    // Calling function
    getMovie();
  }, [movieId, allMovies, isFetchingMovies]);

  // If there is no movie found or an error occurred
  if (!movieId && !isLoading) {
    return (
      <SidebarLayout showBack>
        <Error />
      </SidebarLayout>
    );
  }

  // If movie is being fetched
  if (isLoading) {
    return (
      <SidebarLayout>
        <ScreenLoader />
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout
      pageName={movie ? `${movie.title} Details` : "Not found"}
      showBack
    >
      {movie ? (
        <>
          <div className="flex flex-wrap gap-2">
            <SelectInputField
              id="STATUS"
              options={statusOptions}
              defaultVal={movie.status}
              disabled
            />
            <SelectInputField
              id="BOOKING"
              options={bookingOptions}
              defaultVal={movie.isBooking ? "true" : "false"}
              disabled
            />
          </div>
          <StateInputField
            id="trailer_link"
            label="Trailer Link"
            placeholder="Trailer link"
            value={movie.trailer_link}
            readOnly
          />
          <MovieDetailsSection {...movie} />
        </>
      ) : (
        <NotFound
          message={`No movie found`}
          label="Go back to movies"
          href="/movies"
        />
      )}
    </SidebarLayout>
  );
};

export default MovieDetails;
