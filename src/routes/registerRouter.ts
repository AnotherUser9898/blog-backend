import Router from "express";
import { validateUserRegistration } from "../validation/validateUserRegistration.js";
import { registerUserPost } from "../controllers/registerUserPost.js";

const registerRouter = Router();

registerRouter.post("/", validateUserRegistration, registerUserPost);

export { registerRouter };
