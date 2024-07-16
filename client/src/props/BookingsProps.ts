import { TimeProps, ScreenProps } from "./ShowtimeProps";

interface BookingProps {
  _id: string;
  movie: {
    title: string;
  };
  bookingNumber: number;
  status: "paymentFailed" | "verified" | "paymentRequired";
  customerName: string;
  customerEmail: string;
  showtimeId: string;
  date: string;
  time: TimeProps;
  language: string;
  screen: ScreenProps;
  seats: string[];
  isPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
  paymentSessionId: string;
}

export default BookingProps;
