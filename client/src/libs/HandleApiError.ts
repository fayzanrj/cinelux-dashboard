import { toast } from "sonner";

const getErrorMessage = (error: any): string => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }

  return error.message;
};

export const handleApiError = (error: any) => {
  const errorMessage = getErrorMessage(error);
  console.log(error)
  toast.error(errorMessage);
};
