import express from "express";
import * as adminControllers from "../controllers/AdminControllers.js";
import validateAdminData from "../middlewares/ValidateAdminData.js";
import AdminAuthorizeMiddleware from "../middlewares/AdminAuthorizeMiddleware.js";
import AuthorizeMiddleware from "../middlewares/AuthorizeMiddleware.js";
import IsValidIdMiddle from "../middlewares/IsValidIdMiddle.js";

// Router object
const router = express.Router();

// Route to add a new admin, checks for admin authorization and valid data
router.post(
  "/addAdmin",
  AdminAuthorizeMiddleware,
  validateAdminData,
  adminControllers.addAdmin
);

// Route for admin login
router.post("/adminLogin", adminControllers.login);

// Route to get a list of all admins, requires authorization
router.get("/getAdmins", AuthorizeMiddleware, adminControllers.getAdmins);

// Route to change password, requires authorization
router.put(
  "/changePassword",
  AuthorizeMiddleware,
  adminControllers.changePassword
);

// Route to remove an admin/editor, checks if the ID is valid and requires admin authorization
router.delete(
  "/removeAdmin/:id",
  IsValidIdMiddle,
  AdminAuthorizeMiddleware,
  adminControllers.removeAdmin
);

// Route to delete the admin/editor's own account, requires authorization
router.delete(
  "/deleteAccount",
  AuthorizeMiddleware,
  adminControllers.deleteAccount
);

export default router;
