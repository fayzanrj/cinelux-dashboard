import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import getBgColor from "../../libs/GetBgColor";

// Base props
interface ScreenModalBaseProps {
  children: React.ReactNode;
  className?: string;
}

// Props for form modal
interface ScreenModalFormProps extends ScreenModalBaseProps {
  closeModal: () => void;
  isForm: true;
  showCancel?: boolean;
}

// Props for confirmation modal
interface ScreenModalConfirmationProps extends ScreenModalBaseProps {
  isConfirmation: true;
}

// Props for loader Modal
interface ScreenModalLoaderProps extends ScreenModalBaseProps {
  isLoader: true;
}

// Props for loader Modal
interface SimpleModalLoaderProps extends ScreenModalBaseProps {
  isSimpleModal: true;
}

// Props
type ScreenModalProps =
  | ScreenModalFormProps
  | ScreenModalLoaderProps
  | ScreenModalConfirmationProps
  | SimpleModalLoaderProps;

const ScreenModal: React.FC<ScreenModalProps> = ({
  className = "",
  ...props
}) => {
  // Props
  const isForm = (props as ScreenModalFormProps).isForm === true;
  const isSimpleModal =
    (props as SimpleModalLoaderProps).isSimpleModal === true;
  const closeModal = (props as ScreenModalFormProps).closeModal;
  const showCancel = (props as ScreenModalFormProps).showCancel;

  // State
  const [scrollPosition, setScrollPosition] = useState(window.pageYOffset);

  // Use effect to cover whole screen according to the page offset
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    document.documentElement.style.overflow = "hidden";

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);

      document.documentElement.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className={`${className} absolute left-0 z-40 flex flex-col items-center justify-center w-full py-6 overflow-y-auto min-h-svh h-svh bg-black/80 PRINT`}
      style={{ top: `${scrollPosition}px` }}
    >
      {/* CLOSE BUTTON */}
      {(isForm || isSimpleModal) && closeModal && showCancel && (
        <CloseButton closeModal={closeModal} />
      )}

      {/* REST OF THE CHILDREN */}
      {props.children}
    </div>
  );
};

export default ScreenModal;

// Close modal button
const CloseButton: React.FC<{ closeModal: () => void }> = ({ closeModal }) => (
  <div
    className="w-[95%] max-w-96 text-right p-2 relative top-3 rounded-lg"
    style={getBgColor("primary")}
  >
    <button onClick={closeModal}>
      <IoMdClose size={"2rem"} color="#ffffff" />
    </button>
  </div>
);
