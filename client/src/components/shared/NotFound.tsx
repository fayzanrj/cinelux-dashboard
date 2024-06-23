import { Link } from "react-router-dom";
import ButtonLayout from "./ButtonLayout";

// Props
interface NotFoundProps {
  message: string;
  label: string;
  href: string;
}

const NotFound: React.FC<NotFoundProps> = ({ label, href, message }) => {
  // Function to reload page
  const reloadPage = () => window.location.reload();

  return (
    <div className="w-full h-full text-center">
      {/* NOT FOUND IMAGE */}
      <img src="/not_found.png" className="w-96 mx-auto" />

      {/* HEADING TEXT */}
      <h3 className="text-3xl text-white font-semibold">{message}</h3>

      {/* ACTIONS */}
      <section className="mt-4 mb-2">
        <Link to={href}>
          <ButtonLayout type="button" isNav background="transparent">
            {label}
          </ButtonLayout>
        </Link>
        <ButtonLayout onClick={reloadPage} className="mx-2 px-4">
          Retry
        </ButtonLayout>
      </section>
    </div>
  );
};

export default NotFound;
