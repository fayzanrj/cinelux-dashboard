import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const useLogout = () => {
  // Hooks
  const { logout } = useAuth();
  const nav = useNavigate();

  return () => {
    logout();
    nav("/");
  };
};

export default useLogout;
