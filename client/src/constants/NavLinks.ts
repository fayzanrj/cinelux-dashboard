import { CiClock2 } from "react-icons/ci";
import { FaUsersLine } from "react-icons/fa6";
import { MdMovie } from "react-icons/md";
import NavLinkProps from "../props/NavLinkProps";

const NavLinks: NavLinkProps[] = [
  {
    link: "showtimes",
    title: "Showtimes",
    Icon: CiClock2,
  },
  {
    link: "movies",
    title: "Movies",
    Icon: MdMovie,
  },
  {
    link: "users",
    title: "Users",
    Icon: FaUsersLine,
  },
];

export default NavLinks;
