import { useEffect, useState } from "react";
import AddNewButton from "../components/shared/AddNewButton";
import RefreshButton from "../components/shared/RefreshButton";
import ScreenLoader from "../components/shared/ScreenLoader";
import DatePicker from "../components/showtimes/DatePicker";
import ShowtimesList from "../components/showtimes/ShowtimesList";
import SidebarLayout from "../components/sidebar/SidebarLayout";
import { useAppContext } from "../context/AppContext";
import { useSearchParams } from "react-router-dom";
import formatDateInDMY from "../libs/FormatDateInDMY";

const Showtimes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // State
  const [selectedDate, setSelectedDate] = useState(
    new Date(searchParams.get("date") || new Date())
  );

  // Destructuring data from app context
  const { FetchShowtimes, showtimes, isFetchingShowtimes } = useAppContext();

  // Use effect to set query date and fetch shows for selected date
  useEffect(() => {
    const date = formatDateInDMY(selectedDate);
    setSearchParams({ date });
    FetchShowtimes(date);
  }, [selectedDate]);

  return (
    <SidebarLayout pageName="Showtimes">
      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Showtimes</h1>
        <div className="flex items-center gap-2">
          <AddNewButton variant="SHOWTIME" />
          <RefreshButton variant="SHOWTIME" selectedDate={selectedDate} />
        </div>
      </header>

      {/* Date picker to select date */}
      <DatePicker
        initialDate={new Date()}
        numDatesToShow={7}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* Loader and showwtime list */}
      <section>
        {isFetchingShowtimes ? (
          <ScreenLoader />
        ) : (
          <ShowtimesList showtimes={showtimes} />
        )}
      </section>
    </SidebarLayout>
  );
};

export default Showtimes;
