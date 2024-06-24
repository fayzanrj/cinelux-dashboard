import { handleBadRequest, handleInternalError } from "../libs/ThrowErrors.js";

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
