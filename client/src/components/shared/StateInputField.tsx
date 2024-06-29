import React from "react";
import getBgColor from "../../libs/GetBgColor";

// Base props
interface StateFieldBaseProps {
  label: string;
  srOnly?: boolean;
  id: "search" | "searchIMDB" | "ShowDate" | "trailer_link";
  value: string;
  placeholder: string;
}

// Prps for read only input field
interface StateFieldReadOnlyProps extends StateFieldBaseProps {
  readOnly?: boolean;
}

// Props for changeable input field
interface StateFieldChangeProps extends StateFieldBaseProps {
  onChange: (text: string) => void;
}

// Props
type StateInputFieldProps = StateFieldReadOnlyProps | StateFieldChangeProps;

const StateInputField: React.FC<StateInputFieldProps> = ({
  label,
  id,
  placeholder,
  value,
  srOnly = false,
  ...props
}) => {
  const onChange = (props as StateFieldChangeProps).onChange;
  const readOnly = (props as StateFieldReadOnlyProps).readOnly || false;

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
        value={value}
        readOnly={readOnly}
        type={"text"}
        className="w-full p-2 mt-2 text-white rounded-lg outline-none"
        style={getBgColor("secondary")}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </>
  );
};

export default StateInputField;
