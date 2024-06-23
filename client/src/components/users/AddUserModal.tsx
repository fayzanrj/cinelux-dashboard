import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import RoleSelectInput from "./RoleSelectInput";
import { AddUserInputType, AddUserSchema } from "../../schema/AddUserSchema";
import useHeaders from "../../hooks/useHeaders";
import { handleApiError } from "../../libs/HandleApiError";
import ScreenModal from "../shared/ScreenModal";
import FormLayout from "../shared/FormLayout";
import InputField from "../shared/InputField";
import { useAppContext } from "../../context/AppContext";
import UserProps from "../../props/UserProps";

// Props
interface AddUserFormProps {
  closeModal: () => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ closeModal }) => {
  // State
  const [isLoading, setIsLoading] = useState(false);
  // Hooks
  const { AddNewAdmin } = useAppContext();
  const headers = useHeaders();

  // React-hook-form
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm<AddUserInputType>({
    resolver: zodResolver(AddUserSchema),
  });

  // Form Submition
  const processForm: SubmitHandler<AddUserInputType> = async (data) => {
    const { confirmPassword, password } = data;

    // Validating password
    if (confirmPassword !== password) {
      setError(
        "confirmPassword",
        {
          message: "Passwords does not match",
        },
        { shouldFocus: true }
      );

      return;
    }

    setIsLoading(true);

    // API CALL
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_HOST}/api/v1/admin/addAdmin`,
      {
        ...data,
      },
      {
        headers,
      }
    );

    toast.success(res.data.message);

    // Adding user in local admin list array
    AddNewAdmin(res.data.user as UserProps);
    closeModal();
    reset();
    try {
      setIsLoading(true);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenModal isForm closeModal={closeModal} showCancel>
      <FormLayout
        variant="ADD USER"
        isLoading={isLoading}
        handleSubmit={handleSubmit(processForm)}
      >
        <InputField
          id="name"
          type="text"
          label="Display name"
          placeholder="e.g. Admin"
          register={register}
          errors={errors}
          isDisabled={isLoading}
        />
        <InputField
          id="username"
          type="text"
          label="Username"
          placeholder="e.g. admin"
          register={register}
          errors={errors}
          isDisabled={isLoading}
        />
        <InputField
          id="password"
          type="password"
          label="Password"
          placeholder="e.g. *******"
          register={register}
          errors={errors}
          isDisabled={isLoading}
        />
        <InputField
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="e.g. *******"
          register={register}
          errors={errors}
          isDisabled={isLoading}
        />

        <RoleSelectInput
          control={control}
          errors={errors}
          isDisabled={isLoading}
        />
      </FormLayout>
    </ScreenModal>
  );
};

export default AddUserForm;
