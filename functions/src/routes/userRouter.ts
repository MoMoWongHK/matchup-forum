//Apply Modules
import * as express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

router.route("/emailExists").post(userController.isUserEmailRegistered);

export default router;
