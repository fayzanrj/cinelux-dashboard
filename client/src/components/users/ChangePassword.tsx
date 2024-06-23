import { useState } from "react";
import { TbPasswordUser } from "react-icons/tb";
import ButtonLayout from "../shared/ButtonLayout";
import ChangePasswordModal from "../users/ChangePasswordModal";

const ChangePassword = () => {
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fuction to open and close modal
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <>
      {isModalOpen && <ChangePasswordModal closeModal={toggleModal} />}

      {/* CHANGE PASSWORD BUTTON */}
      <ButtonLayout
        type="button"
        onClick={toggleModal}
        background="primary"
        className="px-3.5"
      >
        <TbPasswordUser />
      </ButtonLayout>
    </>
  );
};

export default ChangePassword;
