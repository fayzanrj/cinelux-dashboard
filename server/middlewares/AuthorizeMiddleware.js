import {
  handleInternalError,
  handleUnAuthorizedError,
} from "../libs/ThrowErrors.js";
import { verifyJwt } from "../libs/jwt.js";
import Admin from "../models/AdminModel.js";

const AuthorizeMiddleware = async (req, res, next) => {
  try {
    // Getting access Token from Headers
    const accessToken = req.headers["accesstoken"];

    if (!accessToken) {
      return handleUnAuthorizedError(res);
    }

    // Verifying token and findig user id  in access Token
    const requestingUser = verifyJwt(accessToken);
    if (!requestingUser || requestingUser.userId.length !== 24) {
      return handleUnAuthorizedError(res);
    }

    // Find user from user id founded in access Token
    const user = await Admin.findById(requestingUser.userId);
    if (!user) {
      return handleUnAuthorizedError(res);
    }

    // Setting user
    req.body.user = user;

    // Moving to controller
    next();
  } catch (error) {
    console.error(error);
    return handleInternalError(res);
  }
};

export default AuthorizeMiddleware;
