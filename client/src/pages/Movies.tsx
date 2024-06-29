import { useCallback, useEffect, useState } from "react";
import MoviesList from "../components/movies/MoviesList";
import AddNewButton from "../components/shared/AddNewButton";
import StateInputField from "../components/shared/StateInputField";
import SidebarLayout from "../components/sidebar/SidebarLayout";
import { useAppContext } from "../context/AppContext";
import MovieProps from "../props/MovieProps";
import RefreshButton from "../components/shared/RefreshButton";
import ScreenLoader from "../components/shared/ScreenLoader";

const Movies = () => {
  // State
  const [filteredMovies, setFilteredMovies] = useState<MovieProps[] | null>([]);
  const [searchText, setSearchText] = useState("");
  // Hook
  const { allMovies, isFetchingMovies } = useAppContext();

  // Function to handle search text
  const onSearchChange = (text: string) => {
    setSearchText(text);
    search(text);
  };

  // Function to search movie
  const search = useCallback(
    (text: string) => {
      if (text) {
        setFilteredMovies(
          (prev) =>
            prev &&
            prev.filter((movie) =>
              movie.title.toLowerCase().includes(text.toLowerCase())
            )
        );
      } else {
        setFilteredMovies(allMovies);
      }
    },
    [searchText]
  );

  // Use effect to set all movies
  useEffect(() => {
    setFilteredMovies(allMovies);
  }, [allMovies]);

  return (
    <SidebarLayout pageName="Movies">
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-white">Movies</h1>

      {/* SEARCH BAR */}
      <section className="my-6">
        <StateInputField
          id="search"
          label="Search Movies"
          placeholder="Enter movie name"
          value={searchText}
          onChange={onSearchChange}
          srOnly
        />
      </section>

      <div className="flex flex-wrap justify-end gap-2">
        {/* ADD NEW MOVIES BUTTON */}
        <AddNewButton variant="MOVIE" />
        {/* REFRESH BUTTON */}
        <RefreshButton variant="MOVIE" />
      </div>

      {/* ALL/FILTERED MOVIES LIST */}
      {isFetchingMovies ? (
        <ScreenLoader />
      ) : (
        <MoviesList movies={filteredMovies} />
      )}
    </SidebarLayout>
  );
};

export default Movies;
