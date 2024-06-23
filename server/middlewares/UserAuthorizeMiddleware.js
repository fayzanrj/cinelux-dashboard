import {
  handleInternalError,
  handleUnAuthorizedError,
} from "../libs/ThrowErrors.js";
import { verifyJwt } from "../libs/jwt.js";
import Admin from "../models/AdminModel.js";

const UserAuthorizeMiddleware = async (req, res, next) => {
  try {
    // Getting access Token from Headers
    const accessToken = req.headers["accesstoken"];

    // Verifying token
    if (accessToken !== process.env.USER_ACCESS_TOKEN)
      return handleUnAuthorizedError(res);

    // Moving to controller
    next();
  } catch (error) {
    console.error(error);
    return handleInternalError(res);
  }
};

export default UserAuthorizeMiddleware;
