import axios from "axios";
import { useState } from "react";
import useUserHeaders from "../hooks/useUserHeaders";
import { handleApiError } from "../libs/HandleApiError";
import MovieProps from "../props/MovieProps";

export const useMoviesFunctions = () => {
  // States
  const [allMovies, setAllMovies] = useState<MovieProps[] | null>(null);
  const [isFetchingMovies, setIsFetchingMovies] = useState(true);

  // Header hooks
  const userHeaders = useUserHeaders();

  // Function to fetch all movies
  const FetchMovies = async () => {
    try {
      setIsFetchingMovies(true);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_HOST}/api/v1/movies/allMovies`,
        {
          headers: userHeaders,
        }
      );
      setAllMovies(res.data.movies);
    } catch (error) {
      handleApiError(error);
      setAllMovies(null);
    } finally {
      setIsFetchingMovies(false);
    }
  };

  // Function to find a movie by ID from allmovies array
  const FindMovieById = (id: string) => {
    if (allMovies) {
      if (!id || id.length !== 24) return null;
      const index = allMovies.findIndex((movie) => movie?._id === id);
      return index > -1 ? allMovies[index] : null;
    }

    return null;
  };

  // Function to add a new movie in allmovies array
  const AddMovie = (movie: MovieProps) => {
    setAllMovies((prev) => [...(prev || []), movie]);
  };

  // Function to delete a movie by ID from allmovies array
  const DeleteMovie = (id: string) => {
    setAllMovies((prev) => prev && prev.filter((movie) => movie._id !== id));
  };

  // Function to update a movie by ID from allmovies array
  const UpdateMovie = (updatedMovie: MovieProps) => {
    setAllMovies(
      (prevMovies) =>
        prevMovies &&
        prevMovies.map((movie) =>
          movie._id === updatedMovie._id ? updatedMovie : movie
        )
    );
  };

  return {
    allMovies,
    isFetchingMovies,
    FetchMovies,
    FindMovieById,
    AddMovie,
    DeleteMovie,
    UpdateMovie,
  };
};
