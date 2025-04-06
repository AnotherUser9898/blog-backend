import Router from "express";
import { loginUserPost } from "../controllers/loginUserPost.js";
import { validateUserLogin } from "../validation/validateUserLogin.js";

const loginRouter = Router();

loginRouter.post("/", validateUserLogin, loginUserPost);

export { loginRouter };
