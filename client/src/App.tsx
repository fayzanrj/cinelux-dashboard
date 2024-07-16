import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import { AppContextProvider } from "./context/AppContext";
import { AuthProvider, RequiredAuth } from "./context/AuthProvider";
import LogInPage from "./pages/LogInPage";
import ShowtimesPage from "./pages/ShowtimesPage";
import ShowtimeDetailsPage from "./pages/ShowtimeDetailsPage";
import TicketingPage from "./pages/TicketingPage";
import MoviesPage from "./pages/MoviesPage";
import AddMoviePage from "./pages/AddMoviePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import UsersPage from "./pages/UsersPage";
import BookingsPage from "./pages/BookingsPage";

function App() {
  // Navigation routes
  const router = createBrowserRouter([
    { path: "/", element: <LogInPage /> },
    {
      path: "/showtimes",
      element: (
        <RequiredAuth>
          <ShowtimesPage />
        </RequiredAuth>
      ),
    },
    {
      path: "/showtimes/:id",
      element: (
        <RequiredAuth>
          <ShowtimeDetailsPage />
        </RequiredAuth>
      ),
    },
    {
      path: "/showtimes/:id/ticketing",
      element: (
        <RequiredAuth>
          <TicketingPage />
        </RequiredAuth>
      ),
    },
    {
      path: "/movies",
      element: (
        <RequiredAuth>
          <MoviesPage />
        </RequiredAuth>
      ),
    },
    {
      path: "/movies/add",
      element: (
        <RequiredAuth>
          <AddMoviePage />
        </RequiredAuth>
      ),
    },
    {
      path: "/movies/details",
      element: (
        <RequiredAuth>
          <MovieDetailsPage />
        </RequiredAuth>
      ),
    },
    {
      path: "/users",
      element: (
        <RequiredAuth>
          <UsersPage />
        </RequiredAuth>
      ),
    },
    {
      path: "/bookings",
      element: (
        <RequiredAuth>
          <BookingsPage />
        </RequiredAuth>
      ),
    },
  ]);

  return (
    <AuthProvider>
      <AppContextProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              minHeight: "40px",
              height: "fit-content",
              fontSize: "16px",
              background: "#292E37",
              color: "#ffffff",
              padding: "0 4px",
            },
          }}
        />
        <RouterProvider router={router} />
      </AppContextProvider>
    </AuthProvider>
  );
}

export default App;
