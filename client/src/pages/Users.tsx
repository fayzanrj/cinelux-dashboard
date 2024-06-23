import { useEffect } from "react";
import AddNewButton from "../components/shared/AddNewButton";
import Error from "../components/shared/Error";
import ScreenLoader from "../components/shared/ScreenLoader";
import SidebarLayout from "../components/sidebar/SidebarLayout";
import UserDetails from "../components/users/UserDetails";
import { useAppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthProvider";
import RefreshButton from "../components/shared/RefreshButton";

const Users = () => {
  // Hooks
  // Destructuring from app context
  const { FetchAdmins, allAdmins, isFetchingAdmins } = useAppContext();
  // Destructuring from auth context
  const { auth } = useAuth();
  const { user } = auth!;

  // Use effect to fetch admins
  useEffect(() => {
    FetchAdmins();
  }, []);

  // Function to render all admins/editors
  const renderDetails = (toRender: "editor" | "admin") => {
    if (allAdmins) {
      return allAdmins.map((admin) => {
        return (
          admin.role === toRender && (
            <UserDetails
              isLoggedInUser={user.username === admin.username}
              showOptions={user.username !== admin.username}
              key={admin._id}
              {...admin}
            />
          )
        );
      });
    }

    return null;
  };

  // If loading is true
  if (isFetchingAdmins) {
    return (
      <SidebarLayout>
        <ScreenLoader />
      </SidebarLayout>
    );
  }

  // If all admins is null
  if (!allAdmins)
    return (
      <SidebarLayout>
        <Error />
      </SidebarLayout>
    );

  return (
    <SidebarLayout pageName="Users">
      <div className="w-full px-4 text-white">
        <div className="flex items-center justify-end gap-2">
          {/* ADMIN ACTION BUTTON */}
          {user.role === "admin" && <AddNewButton variant="USER" />}
          <RefreshButton variant="ADMINS" />
        </div>

        {/* CURRENT LOGGED IN USER */}
        <UserSection label="You">
          {user && <UserDetails isLoggedInUser {...user} showOptions />}
        </UserSection>

        {/* ALL ADMINS */}
        <UserSection label="Admins">{renderDetails("admin")}</UserSection>

        {/* ALL EDITORS */}
        <UserSection label="Editors">{renderDetails("editor")}</UserSection>
      </div>
    </SidebarLayout>
  );
};

export default Users;

// Props for user section
interface UserSectionProps {
  label: string;
  children: React.ReactNode;
}

// Component
const UserSection: React.FC<UserSectionProps> = ({ children, label }) => (
  <section className="my-6">
    <h2 className="text-2xl font-bold">{label}</h2>
    {children}
  </section>
);
