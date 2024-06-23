import React from "react";
import getBgColor from "../../libs/GetBgColor";
import MovieProps from "../../props/MovieProps";
import MovieListItem from "./MovieListItem";

// List of table headers
const tableHeaders = [
  "Title",
  "Release date",
  "Status",
  "Booking",
  "Duration",
  "Action",
];

// Props interface for MoviesList component
interface MoviesListProps {
  movies: MovieProps[] | null;
}

const MoviesList: React.FC<MoviesListProps> = ({ movies }) => {
  return (
    <section className="my-6 overflow-hidden border-2 border-gray-400 rounded-xl">
      <table className="w-full text-center text-white rounded-t-xl min-w-[36rem]">
        <TableHead />
        <tbody>
          {movies ? (
            movies.map((movie) => <MovieListItem key={movie._id} {...movie} />)
          ) : (
            <NoMoviesRow />
          )}
        </tbody>
      </table>
    </section>
  );
};

// TableHead component renders the table headers
const TableHead: React.FC = () => (
  <thead style={getBgColor("secondary")}>
    <tr className="border-b">
      {tableHeaders.map((header) => (
        <th key={header} className="p-4 text-lg font-semibold">
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

// When no movies are available
const NoMoviesRow: React.FC = () => (
  <tr>
    <td colSpan={6} className="p-4">
      No movies available.
    </td>
  </tr>
);

export default MoviesList;
