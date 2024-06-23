import React from "react";
import UserProps from "../../props/UserProps";
import DeleteButton from "../shared/DeleteButton";
import ChangePassword from "./ChangePassword";
import RemoveUser from "./RemoveUser";

// Props
interface UserDetailsProps extends UserProps {
  isLoggedInUser: boolean;
  showOptions?: boolean;
}

const UserDetails: React.FC<UserDetailsProps> = ({
  name,
  isLoggedInUser,
  username,
  _id,
  showOptions = false,
}) => {
  return (
    <div className="flex gap-3 my-2">
      <img
        src={
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
        className="w-10 h-10 rounded-full"
      />
      <div>
        <h3 className="">{name}</h3>
        <p className="text-xs">@{username}</p>
      </div>

      {/* LOGGED IN USER OPTIONS */}
      {isLoggedInUser && showOptions && (
        <div className="w-full text-right">
          <ChangePassword />
          <DeleteButton variant="ACCOUNT" />
        </div>
      )}

      {/* OTHER USERS OPTIONS IF CURRENT USER IS ADMIN */}
      {!isLoggedInUser && showOptions && (
        <div className="w-full text-right">
          <RemoveUser _id={_id} username={username} />
        </div>
      )}
    </div>
  );
};

export default UserDetails;
