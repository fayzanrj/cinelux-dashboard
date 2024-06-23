import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import { AppContextProvider } from "./context/AppContext";
import { AuthProvider, RequiredAuth } from "./context/AuthProvider";
import AddMovie from "./pages/AddMovie";
import LogIn from "./pages/LogIn";
import MovieDetails from "./pages/MovieDetails";
import Movies from "./pages/Movies";
import ShowtimeDetails from "./pages/ShowtimeDetails";
import Showtimes from "./pages/Showtimes";
import Ticketing from "./pages/Ticketing";
import Users from "./pages/Users";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <LogIn /> },
    {
      path: "/showtimes",
      element: (
        <RequiredAuth>
          <Showtimes />
        </RequiredAuth>
      ),
    },
    {
      path: "/showtimes/:id",
      element: (
        <RequiredAuth>
          <ShowtimeDetails />
        </RequiredAuth>
      ),
    },
    {
      path: "/showtimes/:id/ticketing",
      element: (
        <RequiredAuth>
          <Ticketing />
        </RequiredAuth>
      ),
    },
    {
      path: "/movies",
      element: (
        <RequiredAuth>
          <Movies />
        </RequiredAuth>
      ),
    },
    {
      path: "/movies/add",
      element: (
        <RequiredAuth>
          <AddMovie />
        </RequiredAuth>
      ),
    },
    {
      path: "/movies/details",
      element: (
        <RequiredAuth>
          <MovieDetails />
        </RequiredAuth>
      ),
    },
    {
      path: "/users",
      element: (
        <RequiredAuth>
          <Users />
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
