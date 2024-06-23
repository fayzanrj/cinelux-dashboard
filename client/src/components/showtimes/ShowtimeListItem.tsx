import { Link } from "react-router-dom";
import getBgColor from "../../libs/GetBgColor";
import ShowtimeProps from "../../props/ShowtimeProps";
import DeleteButton from "../shared/DeleteButton";

const ShowtimesListItem: React.FC<ShowtimeProps> = ({
  _id,
  movie,
  language,
  screen,
  time,
}) => (
  <div className="my-8 text-white">
    <h3 className="text-lg font-bold">{time}</h3>

    <div
      className="flex items-center justify-between p-2 pt-6 rounded-lg"
      style={getBgColor("secondary")}
    >
      {/* Title and language */}
      <Link to={`/showtimes/${_id}`}>
        <p className="font-semibold">{screen}</p>
        <p className="text-sm font-semibold text-gray-400">
          {movie.title} - {language}
        </p>
      </Link>

      <div>
        <DeleteButton
          variant="SHOWTIME"
          movieTitle={movie.title}
          showtimeId={_id!}
          time={time}
        />
      </div>
    </div>
  </div>
);

export default ShowtimesListItem;
