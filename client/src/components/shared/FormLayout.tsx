import React, { FormEvent } from "react";
import getBgColor from "../../libs/GetBgColor";
import ButtonLayout from "./ButtonLayout";
import Loader from "./Loader";

// Props
interface FormLayoutProps {
  variant:
    | "LOG IN"
    | "ADD USER"
    | "CHANGE PASSWORD"
    | "REMOVE USER"
    | "FIND MOVIE"
    | "UPDATE MOVIE"
    | "ADD SHOWTIME";
  handleSubmit: (() => void) | ((e: FormEvent) => void);
  isLoading: boolean;
  children: React.ReactNode;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  handleSubmit,
  isLoading,
  variant,
  children,
}) => {
  return (
    <form
      className=" w-[95%] max-w-96 px-3 py-4 drop-shadow-xl shadow-lg rounded-lg"
      onSubmit={handleSubmit}
      style={getBgColor("primary")}
    >
      <div className="py-2 text-left">{children}</div>

      {/* SUBMISSION BUTTON */}
      <ButtonLayout
        type="submit"
        className="relative"
        disabled={isLoading}
        fullWidth
      >
        {isLoading ? <Loader /> : variant}
      </ButtonLayout>
    </form>
  );
};

export default FormLayout;
