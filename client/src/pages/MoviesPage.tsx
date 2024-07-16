import { useCallback, useEffect, useState } from "react";
import MoviesList from "../components/movies/MoviesList";
import PageHeader from "../components/shared/PageHeader";
import ScreenLoader from "../components/shared/ScreenLoader";
import StateInputField from "../components/shared/StateInputField";
import SidebarLayout from "../components/sidebar/SidebarLayout";
import { useAppContext } from "../context/AppContext";
import MovieProps from "../props/MovieProps";

const MoviesPage = () => {
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
          allMovies &&
            allMovies.filter((movie) =>
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
      <PageHeader variant="MOVIE" />

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

      {/* ALL/FILTERED MOVIES LIST */}
      {isFetchingMovies ? (
        <ScreenLoader />
      ) : (
        <MoviesList movies={filteredMovies} />
      )}
    </SidebarLayout>
  );
};

export default MoviesPage;
