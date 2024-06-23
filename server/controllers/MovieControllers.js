import {
  handleInternalError,
  handleNotFoundError,
} from "../libs/ThrowErrors.js";
import Movie from "../models/MovieModel.js";

// Controller to add a new movie
export const addMovie = async (req, res) => {
  try {
    const movieData = req.body.movie;

    // Creating a new movie in the database
    const newMovie = await Movie.create({
      ...movieData,
    });

    if (!newMovie) return handleInternalError(res);

    // Response
    return res.status(200).json({
      message: "Movie has been added",
      movie: {
        _id: newMovie._id,
      },
    });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// Controller to get all movies
export const getAllMovies = async (req, res) => {
  try {
    // Fetching all movies from the database
    const movies = await Movie.find();

    // Response
    return res.status(200).json({ movies });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// Controller to delete a movie by ID
export const deleteMovie = async (req, res) => {
  try {
    const id = req.params.id;

    // Deleting a movie from the database by ID
    const deletedMovie = await Movie.findByIdAndDelete(id);

    if (!deletedMovie) return handleNotFoundError(res, "No movie found");

    // Response
    return res.status(200).json({
      message: "Movie has been deleted",
    });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// Controller to edit a movie by ID
export const editMovie = async (req, res) => {
  try {
    const id = req.params.id;
    const movieData = req.body;

    // Deleting the _id field from the movie data (if exists)
    delete movieData._id;

    // Updating the movie in the database by ID
    const updatedMovie = await Movie.findByIdAndUpdate(id, {
      ...movieData,
    });

    if (!updatedMovie) return handleNotFoundError(res, "No movie found");

    // Response
    return res.status(200).json({
      message: "Movie has been updated",
    });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};
