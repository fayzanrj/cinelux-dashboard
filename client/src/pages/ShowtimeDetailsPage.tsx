import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MovieDetailsSection from "../components/movies/MovieDetailsSection";
import Error from "../components/shared/Error";
import ScreenLoader from "../components/shared/ScreenLoader";
import SidebarLayout from "../components/sidebar/SidebarLayout";
import { handleApiError } from "../libs/HandleApiError";
import MovieProps from "../props/MovieProps";
import ShowtimeProps from "../props/ShowtimeProps";
import ButtonLayout from "../components/shared/ButtonLayout";
import { useAppContext } from "../context/AppContext";
import calculateTime from "../libs/CalculateTime";

const ShowtimeDetailsPage = () => {
  // States
  const [showDetails, setShowDetails] = useState<ShowtimeProps | null>(null);
  const [movieDetails, setMovieDetails] = useState<MovieProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Destructuring from app context
  const { FindMovieById, FindShowtimeById, FetchShowtimeById, showtimes } =
    useAppContext();

  // Hooks
  const params = useParams() as { id: string };

  // Use effect to get showtime data
  useEffect(() => {
    const getShowtime = async () => {
      try {
        let showtime = null;
        let movie = null;

        if (showtimes === null) {
          // Extracting showtime from server if showtimes are not already fetched
          const res = await FetchShowtimeById(params.id);
          if (res) {
            showtime = res.showtime;
            movie = res.movie;
          }
        } else {
          // Getting showtime for fetched showtimes
          showtime = params.id ? FindShowtimeById(params.id) : null;
          if (showtime) {
            movie = FindMovieById(showtime.movie._id!);
          }
        }

        setShowDetails(showtime);
        setMovieDetails(movie);
      } catch (error) {
        handleApiError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getShowtime();
  }, [params.id, showtimes]);

  // If showtime is being found
  if (isLoading)
    return (
      <SidebarLayout>
        <ScreenLoader />;
      </SidebarLayout>
    );

  // If details of any not found
  if (!showDetails || !movieDetails)
    return (
      <SidebarLayout showBack>
        <Error />
      </SidebarLayout>
    );

  return (
    <SidebarLayout pageName={`${movieDetails.title} Show`} showBack>
      {/* SHOW DETAILS */}
      <h3 className="text-xl font-bold">Showtime Details</h3>
      <section className="p-4 mb-10">
        <table>
          <ShowtimeDetailItem label="Date" value={showDetails.date} />
          <ShowtimeDetailItem label="Starts at" value={showDetails.time} />
          <ShowtimeDetailItem label="Language" value={showDetails.language} />
          <ShowtimeDetailItem
            label="Runtime"
            value={calculateTime(movieDetails.runtime)}
          />
          {/* Link to seat selection */}
          <Link to={`/showtimes/${params.id}/ticketing`}>
            <ButtonLayout isNav type="button" className="mt-6">
              Book tickets
            </ButtonLayout>
          </Link>
        </table>
      </section>

      {/* MOVIE DETAILS */}
      <h3 className="text-xl font-bold">Movie Details</h3>
      <MovieDetailsSection {...movieDetails!} />
    </SidebarLayout>
  );
};

export default ShowtimeDetailsPage;

// Item props
interface ShowtimeDetailItemProps {
  label: string;
  value: string;
}
// Item component
const ShowtimeDetailItem: React.FC<ShowtimeDetailItemProps> = ({
  label,
  value,
}) => (
  <tr className="text-left text-lg">
    <th>{label}</th>
    <td>{value}</td>
  </tr>
);
