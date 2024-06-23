import { IoChevronBackOutline } from "react-icons/io5";
import ButtonLayout from "./ButtonLayout";
import { useNavigate, useSearchParams } from "react-router-dom";

const GoBack = () => {
  // Hooks
  const [searchParams, _] = useSearchParams();
  const nav = useNavigate();

  // Function to go back
  const handleClick = () => {
    const callback = searchParams.get("callback");

    if (callback) {
      nav(callback);
    } else {
      nav(-1);
    }
  };
  return (
    <ButtonLayout onClick={handleClick} background="transparent">
      <IoChevronBackOutline size={"1.3rem"} />
    </ButtonLayout>
  );
};

export default GoBack;
