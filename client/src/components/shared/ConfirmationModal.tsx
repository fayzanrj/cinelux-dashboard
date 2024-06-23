import React from "react";
import getBgColor from "../../libs/GetBgColor";
import ButtonLayout from "./ButtonLayout";
import ScreenModal from "./ScreenModal";

// Base props
interface ConfirmationModalBaseProps {
  handleClick: () => void;
  closeModal: () => void;
}

// Props for account deletion
interface ConfirmationModalAccountProps extends ConfirmationModalBaseProps {
  variant: "ACCOUNT";
}

// Props for showtime deletion
interface ConfirmationModalShowtimeProps extends ConfirmationModalBaseProps {
  variant: "SHOWTIME";
  movieTitle: string;
  time: string;
}

// Props for user remove
interface ConfirmationModalUserProps extends ConfirmationModalBaseProps {
  variant: "USER";
  username: string;
}

// Props for movie deletion
interface ConfirmationModalMovieProps extends ConfirmationModalBaseProps {
  variant: "MOVIE";
  movieTitle: string;
}

// Confirmation Modal type
type ConfirmationModalProps =
  | ConfirmationModalAccountProps
  | ConfirmationModalUserProps
  | ConfirmationModalMovieProps
  | ConfirmationModalShowtimeProps;

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  handleClick,
  closeModal,
  variant,
  ...props
}) => {
  // Getting username and movie title
  const username = (props as ConfirmationModalUserProps).username;
  const movieTitle = (
    (props as ConfirmationModalMovieProps) ||
    (props as ConfirmationModalShowtimeProps)
  ).movieTitle;
  const time = (props as ConfirmationModalShowtimeProps).time;

  // Function to get text
  const renderText = () => {
    switch (variant) {
      case "ACCOUNT":
        return "delete your account?";
      case "USER":
        return `remove ${username}?`;
      case "MOVIE":
        return `delete ${movieTitle}?`;
      case "SHOWTIME":
        return `delete screening of ${movieTitle} at ${time}?`;
      default:
        return "delete";
    }
  };

  // Function to get button text
  const renderButtonText = () => {
    switch (variant) {
      case "ACCOUNT":
        return "Delete Account";
      case "USER":
        return `Remove ${
          username.length > 10 ? username.slice(0, 8) + "..." : username
        }`;
      case "MOVIE":
        return `Delete ${
          movieTitle.length > 15 ? movieTitle.slice(0, 8) + "..." : movieTitle
        }`;
      case "SHOWTIME":
        return "Delete Showtime";
      default:
        return "Delete";
    }
  };

  return (
    <ScreenModal isConfirmation>
      <div
        className="w-[95%] max-w-96 p-4 shadow-xl rounded-xl"
        style={getBgColor("primary")}
      >
        {/* HEADING */}
        <div className="pt-1 pb-3 text-left border-b border-gray-400">
          <h3 className="text-xl font-bold">
            {variant === "USER" ? "Remove" : "Deletion"} Confirmation
          </h3>
        </div>

        {/* MESSAGE */}
        <div className="my-8 text-left">
          <p>
            Are you sure you want to{" "}
            <span className="font-semibold">{renderText()}</span>
          </p>
          <p className="text-sm font-bold">This action is irreversible.</p>
        </div>

        {/* BUTTONS */}
        <div className="text-right">
          <ButtonLayout onClick={closeModal} background="transparent">
            Cancel
          </ButtonLayout>
          <ButtonLayout onClick={handleClick} background="danger">
            {renderButtonText()}
          </ButtonLayout>
        </div>
      </div>
    </ScreenModal>
  );
};

export default ConfirmationModal;
