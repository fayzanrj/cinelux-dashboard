import {
  handleBadRequest,
  handleInternalError,
  handleUnAuthorizedError,
} from "../libs/ThrowErrors.js";
import { verifyJwt } from "../libs/jwt.js";
import Admin from "../models/AdminModel.js";

const IsValidIdMiddle = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Checking is provided id is valid
    if (id.length !== 24) return handleBadRequest(res, "Invalid Id");

    // Moving to controller
    next();
  } catch (error) {
    console.error(error);
    return handleInternalError(res);
  }
};

export default IsValidIdMiddle;
