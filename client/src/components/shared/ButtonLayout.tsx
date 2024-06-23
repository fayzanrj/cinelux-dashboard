import React from "react";
import COLORS from "../../constants/Colors";

// Base Props
interface ButtonLayoutBaseProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  background?: "primary" | "danger" | "transparent";
}

// Type Button props
interface ButtonTypeProps extends ButtonLayoutBaseProps {
  type?: "button";
  onClick: () => void;
}

// Type Submit props
interface SubmitTypeProps extends ButtonLayoutBaseProps {
  type: "submit";
  onClick?: never;
}

// Type Nav props
interface NavTypeProps extends ButtonLayoutBaseProps {
  type: "button";
  isNav: boolean;
  onClick?: never;
}

// Button layout type
type ButtonLayoutProps = ButtonTypeProps | SubmitTypeProps | NavTypeProps;

const ButtonLayout: React.FC<ButtonLayoutProps> = ({
  children,
  onClick,
  className,
  background = "primary",
  type = "button",
  disabled = false,
  fullWidth = false,
}) => {
  // Function to get button background color
  const getButtonBgColor = () => {
    switch (background) {
      case "primary":
        return COLORS["primaryButton"];
      case "danger":
        return COLORS["dangerButton"];
      case "transparent":
      default:
        return "";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className} h-10 font-semibold text-white rounded-lg disabled:opacity-50 ${
        fullWidth ? "w-full" : "w-fit px-2"
      }`}
      style={{
        backgroundColor: getButtonBgColor(),
      }}
    >
      {children}
    </button>
  );
};

export default ButtonLayout;
