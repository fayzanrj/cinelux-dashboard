import React from "react";
import BookingProps from "../../props/BookingsProps";
import Error from "../shared/Error";
import SidebarLayout from "../sidebar/SidebarLayout";
import BookingsListItem from "./BookingsListItem";

// Props
interface BookingsListProps {
  bookings: BookingProps[] | null;
}

const BookingsList: React.FC<BookingsListProps> = ({ bookings }) => {
  // If there is an error fetching bookings
  if (!bookings) return;
  <SidebarLayout showBack>
    <Error />
  </SidebarLayout>;

  return (
    <section className="">
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <BookingsListItem key={booking._id} {...booking} />
        ))
      ) : (
        <p className="text-xl my-6 font-semibold">No Bookings found</p>
      )}
    </section>
  );
};

export default BookingsList;
