import { Link } from "react-router-dom";
import MovieProps from "../../props/MovieProps";
import calculateTime from "../../libs/CalculateTime";
import EditButton from "../shared/EditButton";
import DeleteButton from "../shared/DeleteButton";

// MOVIE LIST ITEM
const MovieListItem: React.FC<MovieProps> = ({
  title,
  isBooking,
  runtime,
  release_date,
  _id,
}) => (
  <tr>
    {/* TITLE */}
    <td className="p-4 text-left">
      <Link to={`/movies/details?id=${_id}`}>{title}</Link>
    </td>

    {/* RELEASE DATE */}
    <td className="p-4">{release_date}</td>

    {/* STATUS */}
    <td className="p-4">
      {status === "NOW_SHOWING" ? "Now Showing" : "Coming Soon"}
    </td>

    {/* BOOKING */}
    <td className="p-4">{isBooking ? "YES" : "NO"}</td>

    {/* RUNTIME */}
    <td className="p-4">{calculateTime(runtime)}</td>

    {/* ACTION */}
    <td className="p-4">
      <EditButton variant="MOVIE" movieId={_id || ""} />
      <DeleteButton variant="MOVIE" movieId={_id || ""} movieTitle={title} />
    </td>
  </tr>
);

export default MovieListItem;
