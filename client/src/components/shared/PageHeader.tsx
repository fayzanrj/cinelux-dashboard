import React from "react";
import RefreshButton from "./RefreshButton";
import AddNewButton from "./AddNewButton";

// Props for simple header
interface PageHeaderCommonProps {
  variant: "BOOKING" | "MOVIE" | "ADMIN";
}

// Props for showtime variant
interface PageHeaderShowtimeProps {
  variant: "SHOWTIME";
  selectedDate: Date;
}

// Props
type PageHeaderProps = PageHeaderCommonProps | PageHeaderShowtimeProps;

const PageHeader: React.FC<PageHeaderProps> = ({ variant, ...props }) => {
  // Selcted date for showtime variant
  const selectedDate = (props as PageHeaderShowtimeProps).selectedDate;

  // Checking is AddNewButton should be rendered
  const showAdd = variant !== "BOOKING";

  // Function to get Header text
  const getHeader = () => {
    switch (variant) {
      case "ADMIN":
        return "Admins";
      case "BOOKING":
        return "Bookings";
      case "MOVIE":
        return "Movies";
      case "SHOWTIME":
        return "Showtimes";
    }
  };

  return (
    <header className="flex flex-wrap items-center justify-between">
      <h1 className="text-3xl font-bold text-white">{getHeader()}</h1>
      <div className="flex items-center gap-2">
        {/* BUTTON TO ADD NEW ITEM */}
        {showAdd && <AddNewButton variant={variant} />}

        {/* BUTTON TO REFRESH */}
        {variant === "SHOWTIME" ? (
          <RefreshButton variant={"SHOWTIME"} selectedDate={selectedDate} />
        ) : (
          <RefreshButton variant={variant} />
        )}
      </div>
    </header>
  );
};

export default PageHeader;
