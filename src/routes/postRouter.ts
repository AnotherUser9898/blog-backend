import Router from "express";
import { createPostPost } from "../controllers/createPostPost.js";
import { verifyJWT } from "../authentication/verifyJWT.js";
import { getAllPostsGET } from "../controllers/getAllPostsGet.js";
import { getPostGET } from "../controllers/getPostGet.js";
import { editPostPost } from "../controllers/editPostPost.js";
import { getAllPostsByUserIdGET } from "../controllers/getAllPostsByUserId.js";

const postRouter = Router();

postRouter.post("/", verifyJWT, createPostPost);
postRouter.get("/", getAllPostsGET);
postRouter.get("/user", verifyJWT, getAllPostsByUserIdGET);
postRouter.get("/:postId", getPostGET);
postRouter.post("/:postId", verifyJWT, editPostPost);

export { postRouter };
