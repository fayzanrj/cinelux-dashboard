import React from "react";
import ShowtimeProps from "../../props/ShowtimeProps";
import Error from "../shared/Error";
import ShowtimesListItem from "./ShowtimeListItem";

// Pros
interface ShowtimesListProps {
  showtimes: ShowtimeProps[] | null;
}

const ShowtimesList: React.FC<ShowtimesListProps> = ({ showtimes }) => {
  // If showtimes does not exist i.e. null
  if (!showtimes) return <Error />;

  // If no showtimes are found
  if (showtimes.length < 1)
    return (
      <div className="my-16 text-2xl font-semibold text-center text-white">
        No showtimes found
      </div>
    );


  return showtimes.map((show) => (
    <ShowtimesListItem key={show._id!} {...show} />
  ));
};

export default ShowtimesList;
