import axios from "axios";
import { useState } from "react";
import useHeaders from "../hooks/useHeaders";
import { handleApiError } from "../libs/HandleApiError";
import UserProps from "../props/UserProps";

export const useAdminsFunctions = () => {
  // States
  const [allAdmins, setAllAdmins] = useState<UserProps[] | null>([]);
  const [isFetchingAdmins, setIsFetchingAdmins] = useState(true);

  // Header hook
  const headers = useHeaders();

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

  // Function to add a new admin in allAdmins array
  const AddNewAdmin = (newUser: UserProps) => {
    setAllAdmins((prev) => [...(prev || []), newUser]);
  };
  
  // Function to add remove an admin in allAdmins array
  const RemoveAdmin = (id: string) => {
    setAllAdmins((prev) => prev && prev.filter((admin) => admin._id !== id));
  };
  
  return {
    allAdmins,
    isFetchingAdmins,
    FetchAdmins,
    AddNewAdmin,
    RemoveAdmin,
  };
};
