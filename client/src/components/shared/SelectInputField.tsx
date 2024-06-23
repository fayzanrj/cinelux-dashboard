import React from "react";
import getBgColor from "../../libs/GetBgColor";
import MovieProps from "../../props/MovieProps";

// Base Props
interface SelectInputFieldBaseProps {
  onChange?: (text: string) => void;
  srOnly?: boolean;
  disabled?: boolean;
}

// Props for movie status
interface SelectInputFieldStatusProps extends SelectInputFieldBaseProps {
  id: "STATUS";
  defaultVal: "NOW_SHOWING" | "COMING_SOON";
  options: {
    value: string;
    label: string;
  }[];
}

// Props for movie booking
interface SelectInputFieldBookingProps extends SelectInputFieldBaseProps {
  id: "BOOKING";
  defaultVal: "true" | "false";
  options: {
    value: string;
    label: string;
  }[];
}

// Props for showtime's time
interface SelectInputFieldTimeProps extends SelectInputFieldBaseProps {
  id: "TIME";
  options: string[];
}

// Props for showtime's screen
interface SelectInputFieldScreenProps extends SelectInputFieldBaseProps {
  id: "SCREEN";
  options: string[];
}

// Props for showtime's movie
interface SelectInputFieldMovieProps extends SelectInputFieldBaseProps {
  id: "MOVIE";
  options: MovieProps[];
}

// Props for showtime's language
interface SelectInputFieldLanguageProps extends SelectInputFieldBaseProps {
  id: "LANGUAGE";
  options: string[];
}

type SelectInputFieldProps =
  | SelectInputFieldStatusProps
  | SelectInputFieldBookingProps
  | SelectInputFieldTimeProps
  | SelectInputFieldScreenProps
  | SelectInputFieldMovieProps
  | SelectInputFieldLanguageProps;

const SelectInputField: React.FC<SelectInputFieldProps> = ({
  id,
  options,
  onChange = () => {},
  disabled = false,
  srOnly = false,
  ...props
}) => {
  // Default value for movie status and booking
  const defaultVal =
    id === "STATUS" || id === "BOOKING"
      ? (props as SelectInputFieldStatusProps | SelectInputFieldBookingProps)
          .defaultVal
      : "";

  // Function to get label
  const getLabel = (id: SelectInputFieldProps["id"]): string => {
    switch (id) {
      case "STATUS":
        return "Status";
      case "BOOKING":
        return "Booking";
      case "TIME":
        return "Time";
      case "SCREEN":
        return "Screen";
      case "MOVIE":
        return "Movie";
      case "LANGUAGE":
        return "Language";
      default:
        return "";
    }
  };

  // Function to render options
  const renderOptions = () => {
    return options.map((option, index) => {
      switch (id) {
        case "STATUS":
        case "BOOKING":
          return (
            <option value={(option as { value: string }).value} key={index}>
              {(option as { label: string }).label}
            </option>
          );
        case "MOVIE":
          return (
            <option key={index} value={(option as MovieProps)._id}>
              {(option as MovieProps).title}
            </option>
          );
        default:
          return (
            <option value={option as string} key={index}>
              {option as string}
            </option>
          );
      }
    });
  };

  return (
    <div className="my-4">
      {/* LABEL */}
      <label
        htmlFor={id}
        className={`text-sm font-semibold text-white ${
          srOnly ? "sr-only" : ""
        }`}
      >
        {getLabel(id)}
      </label>
      <br />
      {/* SELECT INPUT */}
      <select
        id={id}
        className="w-full p-2 text-white rounded-lg min-w-20 max-w-96"
        style={getBgColor("secondary")}
        defaultValue={defaultVal}
        disabled={disabled}
        onChange={(e) => onChange(e.currentTarget.value)}
      >
        {id !== "BOOKING" && id !== "STATUS" && (
          <option value={""}>Select</option>
        )}

        {/* FOR RENDERING ALL THE OPTIONS */}
        {renderOptions()}
      </select>
    </div>
  );
};

export default SelectInputField;
