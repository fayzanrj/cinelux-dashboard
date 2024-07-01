import { validateEmail } from "../libs/RegexFunctions.js";
import {
  handleBadRequest,
  handleIncompleteError,
  handleInternalError,
} from "../libs/ThrowErrors.js";
import Code from "../models/CodeModel.js";
import generateCode from "../libs/generateCode.js";
import { SendCodeEmail } from "../libs/SendCodeEmail.js";

// Controller function to send or resend a verification code
export const sendCode = async (req, res) => {
  try {
    // Destructuring and validating request body
    let { email, name } = req.body;
    if (!email) {
      return handleIncompleteError(res);
    }

    email = email.toLowerCase();

    // Validating email
    if (!validateEmail(email)) {
      return handleBadRequest(res, "Invalid email");
    }

    // Checking if a code already exists for the email
    let existingCode = await Code.findOne({ email });

    // Generating a new verification code
    const code = generateCode();

    // If code exists, updating it; otherwise, creating a new one
    if (existingCode) {
      existingCode.code = code;
      await existingCode.save();
    } else {
      existingCode = await Code.create({ email, code });
    }

    // Sending email if code is saved in the database
    if (existingCode) {
      const sendingMail = await SendCodeEmail(
        email,
        name,
        "Verification of account",
        code
      );

      // If email is not sent
      if (!sendingMail) return handleInternalError(res);
    }

    // Sending success response
    return res.status(200).json({
      message: "Verification code has been sent",
    });
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

// Controller function to verify a verification code
export const verifyCode = async (req, res) => {
  try {
    // Destructuring and validating request body
    let { email, code } = req.body;
    if (!email || !code) {
      return handleIncompleteError(res);
    }

    email = email.toLowerCase();

    // Validating email
    if (!validateEmail(email)) {
      return handleBadRequest(res, "Invalid email");
    }

    // Finding the verification code in the database
    const codeInDb = await Code.findOne({ code, email });
    if (!codeInDb) {
      return handleBadRequest(res, "Incorrect Code"); // Handling bad request error
    }

    // Code verification successful, no need to update or delete the code

    // Sending success response
    return res.status(200).json({
      message: "Verification successful",
    });
  } catch (error) {
    console.error(error);
    handleInternalError(res); // Handling internal server error
  }
};
