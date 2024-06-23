interface UserProps {
  _id: string;
  username: string;
  name: string;
  role: "editor" | "admin";
}

export default UserProps;
