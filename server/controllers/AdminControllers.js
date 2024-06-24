import bcrypt from "bcryptjs";
import {
  handleBadRequest,
  handleIncompleteError,
  handleInternalError,
  handleNotFoundError,
} from "../libs/ThrowErrors.js";
import {
  signJwtAccessToken,
  signJwtRefreshToken,
  verifyJwtRefreshToken,
} from "../libs/jwt.js";
import Admin from "../models/AdminModel.js";

// Handling the addition of a new admin
export const addAdmin = async (req, res) => {
  try {
    // Destructuring
    const { username, name, password, role } = req.body;
    const normalizedUsername = username.toLowerCase();

    // Checking if the user already exists with the provided username
    const adminExists = await Admin.findOne({ username: normalizedUsername });
    if (adminExists) {
      return handleBadRequest(res, "User already exists with this username");
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new admin
    const newAdmin = await Admin.create({
      username: normalizedUsername,
      password: hashedPassword,
      name,
      role,
    });

    if (!newAdmin) {
      return handleInternalError(res);
    }

    // Response
    return res.status(200).json({
      message: "User has been added",
      user: {
        _id: newAdmin._id,
        username: newAdmin.username,
        role: newAdmin.role,
        name: newAdmin.name,
      },
    });
  } catch (error) {
    console.error(error);
    return handleInternalError(res);
  }
};

// Handling admin login
export const login = async (req, res) => {
  try {
    // Destructuring
    const { username, password } = req.body;

    // Validating data
    if (!username || !password) {
      return handleIncompleteError(res);
    }

    // Finding the admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return handleBadRequest(res, "Invalid Credentials");
    }

    // Comparing the provided password with the stored hashed password
    const isCorrectPassword = await bcrypt.compare(password, admin.password);
    if (!isCorrectPassword) {
      return handleBadRequest(res, "Invalid Credentials");
    }

    // Signing a JWT access token
    const accessToken = signJwtAccessToken({ userId: admin.id });
    const refreshToken = signJwtRefreshToken({ userId: admin.id });

    // Response
    return res.status(200).json({
      message: "Successfully Logged in",
      accessToken,
      refreshToken,
      user: {
        _id: admin._id,
        username: admin.username,
        role: admin.role,
        name: admin.name,
      },
    });
  } catch (error) {
    console.error(error);
    return handleInternalError(res);
  }
};

// Handling fetching all admins
export const getAdmins = async (req, res) => {
  try {
    // Finding all admins and selecting specific fields
    const allUsers = await Admin.find().select("_id username role name");

    // Response
    return res.status(200).json({ users: allUsers });
  } catch (error) {
    console.error(error);
    return handleInternalError(res);
  }
};

// Handling password change for an admin
export const changePassword = async (req, res) => {
  try {
    // Destructuring
    const { user, oldPassword, newPassword } = req.body;

    // Comparing the provided old password with the stored hashed password
    const isCorrectPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isCorrectPassword) {
      return handleBadRequest(res, "Old password is not correct");
    }

    // Hashing the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Updating the admin's password
    const updatedUser = await Admin.findByIdAndUpdate(user._id, {
      password: hashedNewPassword,
    });

    if (!updatedUser) {
      return handleInternalError(res);
    }

    // Response
    return res
      .status(200)
      .json({ message: "Password has been updated successfully" });
  } catch (error) {
    console.error(error);
    return handleInternalError(res);
  }
};

// Handling the removal of an admin by ID
export const removeAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    // Deleting the admin by ID
    const deletedUser = await Admin.findByIdAndDelete(id);

    if (!deletedUser) return handleNotFoundError(res, "No user found");

    // Response
    return res
      .status(200)
      .json({ message: "User has been removed successfully" });
  } catch (error) {
    console.error(error);
    return handleInternalError(res);
  }
};

// Handling the deletion of the admin's own account
export const deleteAccount = async (req, res) => {
  try {
    const { user } = req.body;

    // Deleting the admin by their own ID
    const deletedUser = await Admin.findByIdAndDelete(user._id);

    if (!deletedUser) return handleNotFoundError(res, "No user found");

    // Response
    return res
      .status(200)
      .json({ message: "Account has been deleted successfully" });
  } catch (error) {
    console.error(error);
    return handleInternalError(res);
  }
};

// Handling token refresh
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return handleBadRequest(res, "Refresh token is required");
    }

    // Verify the refresh token
    const decoded = verifyJwtRefreshToken(refreshToken);
    if (!decoded) {
      return handleBadRequest(res, "Invalid refresh token");
    }

    // Checking if user exists in db
    const userExists = await Admin.findById(decoded.userId);
    if (!userExists) {
      return handleBadRequest(res, "User not found");
    }

    // Generate a new access token
    const newAccessToken = signJwtAccessToken({ userId: decoded.userId });

    // Response
    return res.status(200).json({
      message: "Token refreshed successfully",
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error(error);
    return handleInternalError(res);
  }
};
