const useUserHeaders = () => {
  return {
    "Content-Type": "application/json",
    accessToken: import.meta.env.VITE_USER_ACCESS_TOKEN,
  };
};

export default useUserHeaders;
