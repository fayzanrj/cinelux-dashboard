import { Link, useLocation } from "react-router-dom";
import NavLinks from "../../constants/NavLinks";
import getBgColor from "../../libs/GetBgColor";
import NavLinkProps from "../../props/NavLinkProps";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  return (
    <aside
      className="fixed z-40 h-screen p-4 px-6 w-72"
      style={getBgColor("primary")}
    >
      {/* NAV LINKS */}
      <ul>
        {NavLinks.map((nav) => (
          <SideBarItem key={nav.link} {...nav} />
        ))}
      </ul>

      {/* LOG OUT BUTTON */}
      <div className="absolute w-[15rem] bottom-5">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default Sidebar;

// Sidebar List item
const SideBarItem: React.FC<NavLinkProps> = ({ Icon, link, title }) => {
  // Hook
  const { pathname } = useLocation();

  // Spliting path
  const paths = pathname.split("/");

  return (
    <li>
      <Link
        to={`/${link}`}
        className={`flex items-center gap-5 p-2 my-2 text-white rounded-lg text-sm font-semibold ${
          paths[1] === link ? "bg-[#292E37]" : "bg-transparent"
        }`}
      >
        <Icon size={"1.5rem"} />
        {title}
      </Link>
    </li>
  );
};
