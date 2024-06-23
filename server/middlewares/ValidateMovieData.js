const ValidateMovieData = (req, res, next) => {
  // Extracting movie data from request body
  const movie = req.body;

  // Removing the _id field if it is present
  if (movie._id) {
    delete movie._id;
  }

  // Setting default value for isBooking if not provided
  movie.isBooking = movie.isBooking || false;

  // Validating required fields
  const requiredFields = [
    "title",
    "overview",
    "poster_path",
    "release_date",
    "genres",
    "status",
  ];

  for (const field of requiredFields) {
    if (!movie[field]) {
      return res.status(400).json({ error: `${field} is required` });
    }
  }

  // Validating structure of genres array
  if (
    !Array.isArray(movie.genres) ||
    movie.genres.some((genre) => !genre.id || !genre.name)
  ) {
    return res
      .status(400)
      .json({ error: "Genres must be an array of objects with id and name" });
  }

  // Validating status value against predefined valid statuses
  const validStatuses = ["NOW_SHOWING", "COMING_SOON"];
  if (!validStatuses.includes(movie.status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  // Assigning validated movie object back to request body
  req.body.movie = movie;

  // Moving to controller
  next();
};

export default ValidateMovieData;
