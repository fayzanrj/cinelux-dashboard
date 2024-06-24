import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ScreenLoader from "../components/shared/ScreenLoader";
import Cookies from "js-cookie";

// App auth props
interface Auth {
  user: {
    _id: string;
    username: string;
    role: "admin" | "editor";
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}

// Auth Context props
interface AuthContextProps {
  auth: Auth | null;
  login: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  refreshAccessToken: () => Promise<boolean>; // Added refreshAccessToken function
  loading: boolean;
}

// Auth Context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Auth Provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // States
  const [auth, setAuth] = useState<Auth | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user data from cookies
  useEffect(() => {
    const savedAuth = Cookies.get("auth");
    if (savedAuth) {
      setAuth(JSON.parse(savedAuth));
    }
    setLoading(false);
  }, []);

  // Function to log user in
  const login = async (username: string, password: string) => {
    try {
      // API CALL
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_HOST}/api/v1/admin/adminLogin`,
        {
          username: username.toLowerCase(),
          password,
        }
      );
      const authData: Auth = response.data;
      setAuth(authData);
      // Setting user data in cookies
      Cookies.set("auth", JSON.stringify(authData), { expires: 7 });
      return { success: true, message: "Logged in successfully!" };
    } catch (error) {
      console.error("Login failed", error);
      return {
        success: false,
        message: "Login failed. Please check your credentials and try again.",
      };
    }
  };

  // Function to log out user
  const logout = () => {
    setAuth(null);
    Cookies.remove("auth");
  };

  // Function to refresh the access token
  const refreshAccessToken = async () => {
    try {
      const refreshToken = auth?.refreshToken;
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_HOST}/api/v1/admin/refreshToken`,
        {
          refreshToken,
        }
      );

      const newAccessToken = response.data.accessToken;

      if (auth) {
        const updatedAuth = { ...auth, accessToken: newAccessToken };
        setAuth(updatedAuth);
        Cookies.set("auth", JSON.stringify(updatedAuth), { expires: 7 });
      }

      return true;
    } catch (error) {
      console.error("Failed to refresh access token", error);
      logout();
      return false;
    }
  };

  // Automatically refresh access token when it expires
  useEffect(() => {
    if (!auth) return;

    const refreshInterval = setInterval(() => {
      refreshAccessToken();
    }, 10000); // Refreshing every 15 minutes

    return () => clearInterval(refreshInterval);
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{ auth, login, logout, refreshAccessToken, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Component to protect routes from unauthorized access
export const RequiredAuth: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { loading, auth } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (!loading && !auth) {
      nav("/");
    }
  }, [loading, auth, nav]);

  if (loading || !auth) return <ScreenLoader />;

  return !loading && auth && <>{children}</>;
};
