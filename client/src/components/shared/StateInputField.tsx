import React from "react";
import getBgColor from "../../libs/GetBgColor";

// Props
interface StateFieldProps {
  label: string;
  srOnly?: boolean;
  id: "search" | "searchIMDB" | "ShowDate";
  onChange: (text: string) => void;
  placeholder: string;
}

const StateInputField: React.FC<StateFieldProps> = ({
  label,
  id,
  onChange,
  placeholder,
  srOnly = false,
}) => {
  return (
    <>
      {/* LABEL */}
      <label
        htmlFor={id}
        className={`text-sm font-semibold text-white ${
          srOnly ? "sr-only" : ""
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        type={"text"}
        className="w-full p-2 mt-2 text-white rounded-lg outline-none"
        style={getBgColor("secondary")}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </>
  );
};

export default StateInputField;
