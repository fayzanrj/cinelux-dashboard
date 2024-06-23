import { MdPersonRemove } from "react-icons/md";
import ButtonLayout from "../shared/ButtonLayout";
import { useState } from "react";
import ConfirmationModal from "../shared/ConfirmationModal";
import { handleApiError } from "../../libs/HandleApiError";
import ScreenLoader from "../shared/ScreenLoader";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import useHeaders from "../../hooks/useHeaders";
import { toast } from "sonner";

// Props
interface RemoveUserProps {
  _id: string;
  username: string;
}

const RemoveUser: React.FC<RemoveUserProps> = ({ username, _id }) => {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Hooks
  const { RemoveAdmin } = useAppContext();
  const headers = useHeaders();

  // Fuction to open and close modal
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  // Fuction to remove user
  const RemoveUserApi = async () => {
    try {
      setIsModalOpen(false);
      setIsLoading(true);

      // API CALL
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_HOST}/api/v1/admin/removeAdmin/${_id}`,
        {
          headers,
        }
      );
      toast.success(res.data.message);
      // Removing user from local users array
      RemoveAdmin(_id);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <ScreenLoader />;

  return (
    <>
      {isModalOpen && (
        <ConfirmationModal
          variant="USER"
          username={username}
          handleClick={RemoveUserApi}
          closeModal={toggleModal}
        />
      )}

      <ButtonLayout
        onClick={toggleModal}
        background="danger"
        className="px-3.5"
      >
        <MdPersonRemove />
      </ButtonLayout>
    </>
  );
};

export default RemoveUser;
