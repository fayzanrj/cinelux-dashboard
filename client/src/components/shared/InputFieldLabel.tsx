import React from "react";

// Props
interface InputFieldLabelProps {
  label: string;
  errors: any;
  id: string;
}
const InputFieldLabel: React.FC<InputFieldLabelProps> = ({
  errors,
  id,
  label,
}) => {
  return (
    <label htmlFor={id} className="text-sm font-semibold text-white">
      {label} {/* Error message */}
      {errors[id]?.message && (
        <span className="text-xs text-red-700">({errors[id].message})</span>
      )}
    </label>
  );
};

export default InputFieldLabel;
