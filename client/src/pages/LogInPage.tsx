import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import InputField from "../components/shared/InputField";
import FormLayout from "../components/shared/FormLayout";
import COLORS from "../constants/Colors";
import { useAuth } from "../context/AuthProvider";
import { handleApiError } from "../libs/HandleApiError";
import { LogInInputType, logInFormSchema } from "../schema/LoginFormSchema";
import ScreenLoader from "../components/shared/ScreenLoader";

const LogInPage = () => {
  // State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Hooks
  const nav = useNavigate();
  // Destructing from auth context
  const { login, auth, loading: authLoading } = useAuth();

  // useForm hook to handle form state and validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInInputType>({
    resolver: zodResolver(logInFormSchema),
  });

  // Form submission function
  const processForm: SubmitHandler<LogInInputType> = async (data) => {
    try {
      setIsLoading(true);
      const { username, password } = data;

      // Validating
      if (username.length <= 3 || password.length < 6) {
        toast.error("Credentials does not match");
        return;
      }

      // API CALL
      const res = await login(username.toLowerCase(), password);

      if (res.success) {
        toast.success("Logged in successfully!");
        nav("/showtimes");
      } else {
        throw new AxiosError(res.message);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // If accessToken is being fetched
  if (authLoading) return <ScreenLoader />;

  // If accessToken is already availabe
  if (auth && !authLoading) nav("/showtimes");

  // If accessToken is not found
  return (
    !auth && (
      <main
        className="flex items-center justify-center h-svh"
        style={{
          backgroundColor: COLORS.primaryBG,
          borderColor: COLORS.secondaryBG,
        }}
      >
        {/* LOG IN BOX */}
        <FormLayout
          variant="LOG IN"
          isLoading={isLoading}
          handleSubmit={handleSubmit(processForm)}
        >
          {/* Input field for username */}
          <InputField
            id="username"
            label="Username"
            placeholder="e.g. admin"
            type="text"
            errors={errors}
            register={register}
            isDisabled={isLoading}
          />
          {/* Input field for password */}
          <InputField
            id="password"
            label="Password"
            placeholder="e.g. ******"
            type="password"
            errors={errors}
            register={register}
            isDisabled={isLoading}
          />
        </FormLayout>
      </main>
    )
  );
};

export default LogInPage;
