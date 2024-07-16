import axios from "axios";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import useUserHeaders from "../hooks/useUserHeaders";
import { handleApiError } from "../libs/HandleApiError";
import MovieProps from "../props/MovieProps";
import ShowtimeProps from "../props/ShowtimeProps";
import UserProps from "../props/UserProps";
import useHeaders from "../hooks/useHeaders";
import { useAuth } from "./AuthProvider";
import BookingProps from "../props/BookingsProps";

// Props for AppContext
interface AppContextProps {
  // ADMINS PROPS
  allAdmins: UserProps[] | null;
  setAllAdmins: React.Dispatch<React.SetStateAction<UserProps[] | null>>;
  isFetchingAdmins: boolean;
  setIsFetchingAdmins: React.Dispatch<React.SetStateAction<boolean>>;
  FetchAdmins: () => void;
  AddNewAdmin: (newUser: UserProps) => void;
  RemoveAdmin: (id: string) => void;

  // MOVIE PROPS
  allMovies: MovieProps[] | null;
  setAllMovies: React.Dispatch<React.SetStateAction<MovieProps[] | null>>;
  isFetchingMovies: boolean;
  setIsFetchingMovies: React.Dispatch<React.SetStateAction<boolean>>;
  FetchMovies: () => void;
  FindMovieById: (id: string) => MovieProps | null;
  AddMovie: (movie: MovieProps) => void;
  DeleteMovie: (id: string) => void;
  UpdateMovie: (updatedMovie: MovieProps) => void;

  // SHOWTIME PROPS
  showtimes: ShowtimeProps[] | null;
  setShowtimes: React.Dispatch<React.SetStateAction<ShowtimeProps[] | null>>;
  isFetchingShowtimes: boolean;
  setIsFetchingShowtimes: React.Dispatch<React.SetStateAction<boolean>>;
  FetchShowtimes: (date: string) => void;
  FetchShowtimeById: (id: string) => Promise<
    | {
        showtime: ShowtimeProps;
        movie: MovieProps;
      }
    | undefined
  >;
  FindShowtimeById: (id: string) => ShowtimeProps | null;
  AddShowtime: (showtime: ShowtimeProps) => void;
  DeleteShowtime: (id: string) => void;

  // BOOKING PROPS
  bookings: BookingProps[] | null;
  setBookings: React.Dispatch<React.SetStateAction<BookingProps[] | null>>;
  isFetchingBookings: boolean;
  setIsFetchingBookings: React.Dispatch<React.SetStateAction<boolean>>;
  FetchBookings: () => void;
}

// AppContext
const AppContext = createContext<AppContextProps | undefined>(undefined);

// Props for AppContextProvider
interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  // States for admins
  const [allAdmins, setAllAdmins] = useState<UserProps[] | null>([]);
  const [isFetchingAdmins, setIsFetchingAdmins] = useState(true);
  // States for movies
  const [allMovies, setAllMovies] = useState<MovieProps[] | null>(null);
  const [isFetchingMovies, setIsFetchingMovies] = useState(true);
  // States for showtimes
  const [showtimes, setShowtimes] = useState<ShowtimeProps[] | null>(null);
  const [isFetchingShowtimes, setIsFetchingShowtimes] = useState(true);
  // States for bookings
  const [bookings, setBookings] = useState<BookingProps[] | null>(null);
  const [isFetchingBookings, setIsFetchingBookings] = useState(true);

  // Header hooks
  const userHeaders = useUserHeaders();
  const headers = useHeaders();
  const { auth, refreshAccessToken } = useAuth();

  // Function to fetch admins
  const FetchAdmins = async () => {
    try {
      setIsFetchingAdmins(true);
      // API CALL
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_HOST}/api/v1/admin/getAdmins`,
        {
          headers,
        }
      );

      setAllAdmins(res.data.users);
    } catch (error) {
      console.error(error);
      handleApiError(error);
      setAllAdmins(null);
    } finally {
      setIsFetchingAdmins(false);
    }
  };

  // Function to add a new admin
  const AddNewAdmin = (newUser: UserProps) => {
    setAllAdmins((prev) => [...(prev || []), newUser]);
  };

  // Function to remove an admin by ID
  const RemoveAdmin = (id: string) => {
    setAllAdmins((prev) => prev && prev.filter((admin) => admin._id !== id));
  };

  // SHOWTIMES
  // Function to fetch all showtimes of a particular date
  const FetchShowtimes = async (date: string) => {
    try {
      setIsFetchingShowtimes(true);
      const res = await axios.get(
        `${
          import.meta.env.VITE_SERVER_HOST
        }/api/v1/showtimes/getShowtimesByDate/${date}`,
        {
          headers: userHeaders,
        }
      );
      setShowtimes(res.data.showtimes);
    } catch (error) {
      console.error("Error fetching shows:", error);
      handleApiError(error);
      setShowtimes(null);
    } finally {
      setIsFetchingShowtimes(false);
    }
  };

  // Function to find a movie by ID
  const FindShowtimeById = (id: string) => {
    if (showtimes) {
      if (!id || id.length !== 24) return null;
      const index = showtimes.findIndex((movie) => movie?._id === id);
      return index > -1 ? showtimes[index] : null;
    }

    return null;
  };

  // Function to fetch showtime by Id from backend
  const FetchShowtimeById = async (id: string) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_SERVER_HOST
        }/api/v1/showtimes/getShowtime/${id}`,
        {
          headers: userHeaders,
        }
      );
      const showtime = res.data.showtime as ShowtimeProps;
      const movie = res.data.movie as MovieProps;
      return { showtime, movie };
    } catch (error) {
      handleApiError(error);
      setAllMovies(null);
    } 
  };

  // Function to add a showtimes in showtimes arrays
  const AddShowtime = (showtime: ShowtimeProps) => {
    setShowtimes((prev) => [...(prev || []), showtime]);
  };

  // Function to remove a showtimes from showtimes arrays
  const DeleteShowtime = (id: string) => {
    setShowtimes((prev) => prev && prev.filter((show) => show._id !== id));
  };

  // MOVIES
  // Function to fetch all movies
  const FetchMovies = async () => {
    try {
      setIsFetchingMovies(true);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_HOST}/api/v1/movies/allMovies`,
        {
          headers: userHeaders,
        }
      );
      setAllMovies(res.data.movies);
    } catch (error) {
      handleApiError(error);
      setAllMovies(null);
    } finally {
      setIsFetchingMovies(false);
    }
  };

  // Function to fetch Movie by Id from db

  // Function to find a movie by ID from allmovies array
  const FindMovieById = (id: string) => {
    if (allMovies) {
      if (!id || id.length !== 24) return null;
      const index = allMovies.findIndex((movie) => movie?._id === id);
      return index > -1 ? allMovies[index] : null;
    }

    return null;
  };

  // Function to add a new movie in allmovies array
  const AddMovie = (movie: MovieProps) => {
    setAllMovies((prev) => [...(prev || []), movie]);
  };

  // Function to delete a movie by ID from allmovies array
  const DeleteMovie = (id: string) => {
    setAllMovies((prev) => prev && prev.filter((movie) => movie._id !== id));
  };

  // Function to update a movie by ID from allmovies array
  const UpdateMovie = (updatedMovie: MovieProps) => {
    setAllMovies(
      (prevMovies) =>
        prevMovies &&
        prevMovies.map((movie) =>
          movie._id === updatedMovie._id ? updatedMovie : movie
        )
    );
  };

  // BOOKINGS
  // Function to fetch bookings
  const FetchBookings = async () => {
    try {
      setIsFetchingBookings(true);
      console.log("hi")
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_HOST}/api/v1/bookings/getAllBookings`,
        {
          headers,
        }
      );
      setBookings(res.data.bookings);
    } catch (error) {
      handleApiError(error);
      setBookings(null);
    } finally {
      setIsFetchingBookings(false);
    }
  };

  // Fetch movies on component mount
  useEffect(() => {
    if (auth && !allMovies) {
      refreshAccessToken();
      FetchMovies();
    }
  }, [auth]);

  return (
    <AppContext.Provider
      value={{
        // Admins
        allAdmins,
        setAllAdmins,
        setIsFetchingAdmins,
        isFetchingAdmins,
        FetchAdmins,
        AddNewAdmin,
        RemoveAdmin,

        // Movies
        allMovies,
        setAllMovies,
        AddMovie,
        DeleteMovie,
        UpdateMovie,
        FetchMovies,
        FindMovieById,
        isFetchingMovies,
        setIsFetchingMovies,

        // Showtimes
        showtimes,
        setShowtimes,
        isFetchingShowtimes,
        setIsFetchingShowtimes,
        FetchShowtimes,
        FetchShowtimeById,
        AddShowtime,
        DeleteShowtime,
        FindShowtimeById,

        // Bookings
        bookings,
        setBookings,
        isFetchingBookings,
        setIsFetchingBookings,
        FetchBookings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook to use AppContext
export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
