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
interface auth {
  user: {
    _id: string;
    username: string;
    role: "admin" | "editor";
    name: string;
  };
  accessToken: string;
}

// Auth Context props
interface AuthContextProps {
  auth: auth | null;
  login: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  loading: boolean;
}

// Auth Context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Auth Provide props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // States
  const [auth, setAuth] = useState<auth | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user data from local storage
  useEffect(() => {
    const savedauth = Cookies.get("auth");
    if (savedauth) {
      setAuth(JSON.parse(savedauth));
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
      const authData: auth = response.data;
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

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
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

// Component to protect routes from uauthorized access
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
