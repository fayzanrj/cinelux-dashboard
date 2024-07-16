import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieDetailsSection from "../components/movies/MovieDetailsSection";
import SaveMovieButton from "../components/movies/SaveMovieButton";
import AddNewButton from "../components/shared/AddNewButton";
import Error from "../components/shared/Error";
import NotFound from "../components/shared/NotFound";
import ScreenLoader from "../components/shared/ScreenLoader";
import SelectInputField from "../components/shared/SelectInputField";
import SidebarLayout from "../components/sidebar/SidebarLayout";
import { bookingOptions, statusOptions } from "../constants/SelectOptions";
import FetchMovieFromIMDB from "../libs/FetchMovieFromIMDB";
import MovieProps from "../props/MovieProps";
import StateInputField from "../components/shared/StateInputField";

const AddMoviePage = () => {
  // States
  const [movie, setMovie] = useState<MovieProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // Hooks
  const [searchParams, _] = useSearchParams();
  const imdbID = searchParams.get("imdb");

  // Use effect to fetch movie using TMDB API
  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      try {
        if (imdbID) {
          const res = await FetchMovieFromIMDB(imdbID);
          if (res) {
            setMovie(res);
          } else {
            setMovie(null);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Calling function
    fetchMovie();
  }, [imdbID]);

  // If there is no movie found or an error occurred
  if (!imdbID && !isLoading) {
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

  return (
    <SidebarLayout pageName="Add Movie" showBack>
      {/* SEARCH MOVIE BUTTON */}
      <AddNewButton
        variant="MOVIE"
        label="Search a different movie"
        background="transparent"
      />

      {movie ? (
        <>
          <SaveMovieButton movie={movie} setIsLoading={setIsLoading} />
          <div className="flex flex-wrap gap-2">
            <SelectInputField
              id="STATUS"
              options={statusOptions}
              defaultVal="COMING_SOON"
              onChange={changeStatus}
            />
            <SelectInputField
              id="BOOKING"
              options={bookingOptions}
              defaultVal="false"
              onChange={changeBooking}
            />
          </div>
          <StateInputField
            id="trailer_link"
            label="Trailer Link"
            placeholder="Add trailer link"
            value={movie.trailer_link}
            onChange={changeTrailerLink}
          />
          <MovieDetailsSection {...movie} />
        </>
      ) : (
        // IF MOVIE IS NOT FOUND
        <>
          <NotFound
            message={`No movie found with IMDB Id : ${imdbID}`}
            label="Go back to movies"
            href="/movies"
          />
        </>
      )}
    </SidebarLayout>
  );
};

export default AddMoviePage;
