import React from "react";
import getBgColor from "../../libs/GetBgColor";

//  Props
interface DateInputFieldProps {
  onChange: (e: string) => void;
}

const DateInputField: React.FC<DateInputFieldProps> = ({ onChange }) => {
  return (
    <>
      <label
        htmlFor={"dateShowtime"}
        className={`text-sm font-semibold text-white`}
      >
        Date
      </label>
      <input
        id="dateShowtime"
        type="date"
        className="w-full p-2 mt-2 text-white rounded-lg outline-none"
        style={getBgColor("secondary")}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </>
  );
};

export default DateInputField;
