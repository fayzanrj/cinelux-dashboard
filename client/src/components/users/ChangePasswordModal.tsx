import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useHeaders from "../../hooks/useHeaders";
import { handleApiError } from "../../libs/HandleApiError";
import {
  ChangePasswordInputType,
  ChangePasswordSchema,
} from "../../schema/ChangePasswordSchema";
import FormLayout from "../shared/FormLayout";
import InputField from "../shared/InputField";
import ScreenModal from "../shared/ScreenModal";

// Props
interface ChangePasswordFormProps {
  closeModal: () => void;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  closeModal,
}) => {
  // State
  const [isLoading, setIsLoading] = useState(false);
  // Hook
  const headers = useHeaders();

  // React-hook-form
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordInputType>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  // Form submission
  const processForm: SubmitHandler<ChangePasswordInputType> = async (data) => {
    const { confirmNewPassword, newPassword } = data;

    // Validating password
    if (confirmNewPassword !== newPassword) {
      setError(
        "confirmNewPassword",
        {
          message: "Passwords does not match",
        },
        { shouldFocus: true }
      );

      return;
    }

    try {
      setIsLoading(true);
      // API CALL
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_HOST}/api/v1/admin/changePassword`,
        { ...data },
        {
          headers,
        }
      );

      toast.success(res.data.message);
      // Resetting form
      reset();
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenModal isForm closeModal={closeModal} showCancel>
      <FormLayout
        variant="CHANGE PASSWORD"
        isLoading={isLoading}
        handleSubmit={handleSubmit(processForm)}
      >
        <InputField
          id="oldPassword"
          type="password"
          label="Old Password"
          placeholder="e.g. *******"
          register={register}
          errors={errors}
          isDisabled={isLoading}
        />
        <InputField
          id="newPassword"
          type="password"
          label="New Password"
          placeholder="e.g. *******"
          register={register}
          errors={errors}
          isDisabled={isLoading}
        />
        <InputField
          id="confirmNewPassword"
          type="password"
          label="Confirm New Password"
          placeholder="e.g. *******"
          register={register}
          errors={errors}
          isDisabled={isLoading}
        />
      </FormLayout>
    </ScreenModal>
  );
};

export default ChangePasswordForm;
