import React from "react";
import { IoMdRefresh } from "react-icons/io";
import { useAppContext } from "../../context/AppContext";
import formatDateInDMY from "../../libs/FormatDateInDMY";
import ButtonLayout from "./ButtonLayout";

// Props
interface RefreshProps {
  variant: "MOVIE" | "ADMIN" | "BOOKING";
}

interface RefreshShowtimeProps {
  variant: "SHOWTIME";
  selectedDate: Date;
}

// Props
type RefreshButtonProps = RefreshProps | RefreshShowtimeProps;

const RefreshButton: React.FC<RefreshButtonProps> = ({ variant, ...props }) => {
  // Extracting selected date from props if variant is Showtime
  const selectedDate = (props as RefreshShowtimeProps).selectedDate;

  // Hook
  const { FetchMovies, FetchShowtimes, FetchAdmins, FetchBookings } =
    useAppContext();

  // Fuction to trigger refreshing
  const refresh = () => {
    try {
      variant === "MOVIE" && FetchMovies();
      variant === "SHOWTIME" && FetchShowtimes(formatDateInDMY(selectedDate));
      variant === "ADMIN" && FetchAdmins();
      variant === "BOOKING" && FetchBookings();
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
