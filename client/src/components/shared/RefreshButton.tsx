import React from "react";
import { IoMdRefresh } from "react-icons/io";
import { useAppContext } from "../../context/AppContext";
import ButtonLayout from "./ButtonLayout";

// Props
interface RefreshMovieProps {
  variant: "MOVIE";
}

interface RefreshShowtimeProps {
  variant: "SHOWTIME";
  selectedDate: Date;
}

interface RefreshAdminsProps {
  variant: "ADMINS";
}

type RefreshButtonProps =
  | RefreshMovieProps
  | RefreshShowtimeProps
  | RefreshAdminsProps;

const RefreshButton: React.FC<RefreshButtonProps> = ({ variant, ...props }) => {
  const selectedDate = (props as RefreshShowtimeProps).selectedDate;

  // Hook
  const { FetchMovies, FetchShowtimes, FetchAdmins } = useAppContext();

  // Fuction to trigger refreshing
  const refresh = () => {
    try {
      variant === "MOVIE" && FetchMovies();
      variant === "SHOWTIME" &&
        FetchShowtimes(selectedDate.toLocaleDateString());
      variant === "ADMINS" && FetchAdmins();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ButtonLayout onClick={refresh} background="transparent">
        <IoMdRefresh size={"1.4rem"} />
      </ButtonLayout>
    </>
  );
};

export default RefreshButton;
