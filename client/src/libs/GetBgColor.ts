import COLORS from "../constants/Colors";

const getBgColor = (color: "primary" | "secondary" | "transparent") => {
  switch (color) {
    case "primary":
      return { backgroundColor: COLORS.primaryBG };
    case "secondary":
      return { backgroundColor: COLORS.secondaryBG };
    case "transparent":
    default:
      return { backgroundColor: "" };
  }
};

export default getBgColor;
