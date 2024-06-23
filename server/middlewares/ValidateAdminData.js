import {
  handleIncompleteError,
  handleInternalError,
} from "../libs/ThrowErrors.js";

const validateAdminData = async (req, res, next) => {
  try {
    // Destructuring
    const { username, name, password, role } = req.body;

    // Checking data availability
    if (
      !username ||
      !name ||
      !password ||
      !role ||
      (role !== "admin" && role !== "editor")
    ) {
      return handleIncompleteError(res);
    }

    // Moving to controller
    next();
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

export default validateAdminData;
