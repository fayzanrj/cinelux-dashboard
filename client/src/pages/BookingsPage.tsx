import { useCallback, useEffect, useState } from "react";
import BookingsList from "../components/bookings/BookingsList";
import PageHeader from "../components/shared/PageHeader";
import ScreenLoader from "../components/shared/ScreenLoader";
import StateInputField from "../components/shared/StateInputField";
import SidebarLayout from "../components/sidebar/SidebarLayout";
import { useAppContext } from "../context/AppContext";
import BookingProps from "../props/BookingsProps";

const BookingsPage = () => {
  const { bookings, FetchBookings, isFetchingBookings } = useAppContext();
  const [filteredBookings, setFilteredBookings] = useState<
    BookingProps[] | null
  >([]);

  const [searchText, setSearchText] = useState("");

  // Function to handle search text
  const onSearchChange = (text: string) => {
    setSearchText(text);
    search(text);
  };

  // Function to search bookings
  const search = useCallback(
    (text: string) => {
      if (text) {
        setFilteredBookings(
          bookings &&
            bookings.filter(({ bookingNumber }) =>
              bookingNumber.toString().includes(text)
            )
        );
      } else {
        setFilteredBookings(bookings);
      }
    },
    [searchText]
  );

  useEffect(() => {
    if (!bookings) FetchBookings();
  }, []);

  useEffect(() => setFilteredBookings(bookings), [bookings]);

  return (
    <SidebarLayout pageName="Showtimes">
      {/* HEADER */}
      <PageHeader variant="BOOKING" />

      {/* SEARCH BAR */}
      <section className="my-6">
        <StateInputField
          id="search"
          label="Search Bookings"
          placeholder="Enter booking id"
          value={searchText}
          onChange={onSearchChange}
          srOnly
        />
      </section>

      {isFetchingBookings ? (
        <ScreenLoader />
      ) : (
        <BookingsList bookings={filteredBookings} />
      )}
    </SidebarLayout>
  );
};

export default BookingsPage;
