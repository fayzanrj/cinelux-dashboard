import { ReactNode, createContext, useContext, useEffect } from "react";
import BookingProps from "../props/BookingsProps";
import MovieProps from "../props/MovieProps";
import ShowtimeProps from "../props/ShowtimeProps";
import UserProps from "../props/UserProps";
import { useAdminsFunctions } from "./AdminsContextFunctions";
import { useAuth } from "./AuthProvider";
import { useBookingsFunctions } from "./BookingsContextFunctions";
import { useMoviesFunctions } from "./MoviesContextFunctions";
import { useShowtimesFunctions } from "./ShowtimesContextFunctions";

interface AppContextProps {
  // ADMINS PROPS
  allAdmins: UserProps[] | null;
  isFetchingAdmins: boolean;
  FetchAdmins: () => void;
  AddNewAdmin: (newUser: UserProps) => void;
  RemoveAdmin: (id: string) => void;

  // MOVIE PROPS
  allMovies: MovieProps[] | null;
  isFetchingMovies: boolean;
  FetchMovies: () => void;
  FindMovieById: (id: string) => MovieProps | null;
  AddMovie: (movie: MovieProps) => void;
  DeleteMovie: (id: string) => void;
  UpdateMovie: (updatedMovie: MovieProps) => void;

  // SHOWTIME PROPS
  showtimes: ShowtimeProps[] | null;
  isFetchingShowtimes: boolean;
  FetchShowtimes: (date: string) => void;
  FetchShowtimeById: (id: string) => Promise<
    | {
        showtime: ShowtimeProps;
        movie: MovieProps;
      }
    | undefined
    | null
  >;
  FindShowtimeById: (id: string) => ShowtimeProps | null;
  AddShowtime: (showtime: ShowtimeProps) => void;
  DeleteShowtime: (id: string) => void;

  // BOOKING PROPS
  bookings: BookingProps[] | null;
  isFetchingBookings: boolean;
  FetchBookings: () => void;
}

// AppContext
const AppContext = createContext<AppContextProps | undefined>(undefined);

// Hook to use AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// App context
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { ...adminState } = useAdminsFunctions();
  const { ...showtimeState } = useShowtimesFunctions();
  const { ...bookingState } = useBookingsFunctions();
  const { ...movieState } = useMoviesFunctions();
  const { auth, refreshAccessToken } = useAuth();

  // Fetch movies and refresh logged in user token on component mount
  useEffect(() => {
    if (auth && !movieState.allMovies) {
      refreshAccessToken();
      movieState.FetchMovies();
    }
  }, [auth]);

  return (
    <AppContext.Provider
      value={{
        ...adminState,
        ...movieState,
        ...showtimeState,
        ...bookingState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
