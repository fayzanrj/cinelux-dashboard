import useLogout from "../../hooks/useLogout";
import ButtonLayout from "../shared/ButtonLayout";

const LogoutButton = () => {
  // Hook
  const LogoutUser = useLogout();

  return (
    <ButtonLayout onClick={LogoutUser} fullWidth>
      LOG OUT
    </ButtonLayout>
  );
};

export default LogoutButton;
