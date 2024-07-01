import express from "express";
import UserAuthorizeMiddleware from "../middlewares/UserAuthorizeMiddleware.js";
import * as codeControllers from "../controllers/CodeControllers.js";

// Router object
const router = express.Router();

router.post("/sendCode", UserAuthorizeMiddleware, codeControllers.sendCode);
router.post("/verifyCode", UserAuthorizeMiddleware, codeControllers.verifyCode);

export default router;
