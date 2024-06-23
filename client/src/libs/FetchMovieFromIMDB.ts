import axios from "axios";
import MovieProps from "../props/MovieProps";

const FetchMovieFromIMDB = async (id: string) => {
  try {
    // API CALL TO TMDB
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_IMDB_API_KEY
      }`
    );
    const movieData = res.data as MovieProps;

    const movie: MovieProps = {
      imdb_id: id,
      title: movieData.title,
      overview: movieData.overview,
      poster_path: movieData.poster_path,
      runtime: movieData.runtime,
      tagline: movieData.tagline,
      vote_average: movieData.vote_average,
      original_language: movieData.original_language,
      release_date: movieData.release_date,
      trailer_link: "",
      genres: movieData.genres,
      isBooking: false,
      status: "COMING_SOON",

    }

    return movie
  } catch (error) {
    return false;
  }
};

export default FetchMovieFromIMDB;
