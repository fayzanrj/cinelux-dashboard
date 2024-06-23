import express from "express";
import * as movieControllers from "../controllers/MovieControllers.js";
import AuthorizeMiddleware from "../middlewares/AuthorizeMiddleware.js";
import IsValidIdMiddle from "../middlewares/IsValidIdMiddle.js";
import UserAuthorizeMiddleware from "../middlewares/UserAuthorizeMiddleware.js";
import ValidateMovieData from "../middlewares/ValidateMovieData.js";

// Router object
const router = express.Router();

// Route to add a new movie, requires authorization
router.post(
  "/add",
  AuthorizeMiddleware,
  ValidateMovieData,
  movieControllers.addMovie
);

// Route to get all movies, requires user authorization
router.get(
  "/allMovies",
  UserAuthorizeMiddleware,
  movieControllers.getAllMovies
);

// Route to delete a movie by ID, requires authorization
router.delete(
  "/delete/:id",
  AuthorizeMiddleware,
  IsValidIdMiddle,
  movieControllers.deleteMovie
);

// Route to edit a movie by ID, requires authorization
router.put(
  "/edit/:id",
  AuthorizeMiddleware,
  IsValidIdMiddle,
  movieControllers.editMovie
);

export default router;
