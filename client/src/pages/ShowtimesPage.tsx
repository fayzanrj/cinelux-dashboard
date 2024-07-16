import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/shared/PageHeader";
import ScreenLoader from "../components/shared/ScreenLoader";
import DatePicker from "../components/showtimes/DatePicker";
import ShowtimesList from "../components/showtimes/ShowtimesList";
import SidebarLayout from "../components/sidebar/SidebarLayout";
import { useAppContext } from "../context/AppContext";
import formatDateInDMY from "../libs/FormatDateInDMY";

const ShowtimesPage = () => {
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
      <PageHeader variant="SHOWTIME" selectedDate={selectedDate} />

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

export default ShowtimesPage;
