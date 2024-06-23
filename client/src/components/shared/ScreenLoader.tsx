import Loader from "./Loader";
import ScreenModal from "./ScreenModal";

const ScreenLoader = () => {
  return (
    <ScreenModal isLoader>
      <Loader />
    </ScreenModal>
  );
};

export default ScreenLoader;
