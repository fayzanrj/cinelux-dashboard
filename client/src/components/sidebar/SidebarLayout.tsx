import React from "react";
import Sidebar from "./Sidebar";
import GoBack from "../shared/GoBack";
import { Helmet } from "react-helmet-async";

// Props
interface SidebarLayoutProps {
  children: React.ReactNode;
  className?: string;
  showBack?: boolean;
  pageName?: string;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  children,
  className = "",
  showBack = false,
  pageName = "",
}) => {
  return (
    <>
      <Sidebar />
      {/* PAGE NAME IF PROVIDED */}
      {pageName && (
        <Helmet>
          <title>{pageName} &#8208; CineLux</title>
        </Helmet>
      )}
      {/* Rest of the page content */}
      <main className={`min-h-full p-14 ml-72 text-white ${className}`}>
        {showBack && <GoBack />}
        {children}
      </main>
    </>
  );
};

export default SidebarLayout;
