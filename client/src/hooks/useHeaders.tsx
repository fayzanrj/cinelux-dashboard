import { useAuth } from "../context/AuthProvider";

const useHeaders = () => {
  // Hook
  const { auth } = useAuth();

  return {
    "Content-Type": "application/json",
    accessToken: auth?.accessToken,
  };
};

export default useHeaders;
