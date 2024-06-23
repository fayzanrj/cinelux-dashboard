import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import getBgColor from "../../libs/GetBgColor";
import InputFieldLabel from "./InputFieldLabel";

// Props
interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  isDisabled: boolean;
  type: "text" | "password" | "email" | "tel";
  errors: any;
  register: any;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  placeholder,
  type,
  errors,
  register,
  isDisabled,
}) => {
  // State
  const [inputType, setInputType] = useState(type);

  // Function to toggle password visibility
  const showPassword = () =>
    setInputType((prev) => (prev === "password" ? "text" : "password"));

  return (
    <div className="my-3">
      {/* LABEL */}
      <InputFieldLabel id={id} label={label} errors={errors} />

      <div className="relative w-full">
        {/* INPUT FIELD */}
        <input
          id={id}
          placeholder={placeholder}
          type={inputType}
          disabled={isDisabled}
          {...register(id)}
          className="w-full p-2 mt-2 text-white rounded-lg outline-none"
          style={getBgColor("secondary")}
        />

        {/* PASSWORD TOGGLE BUTTON */}
        {type === "password" && (
          <button
            className="absolute -translate-y-1/2 right-5 top-[55%]"
            onClick={showPassword}
            type="button"
          >
            {/* TOGGLING EYE ICON BASED ON PASSWORD VISIBILITY */}
            {inputType === "password" ? (
              <IoEye color={"#ffffff"} size={"1.2rem"} />
            ) : (
              <IoEyeOff color={"#ffffff"} size={"1.2rem"} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
