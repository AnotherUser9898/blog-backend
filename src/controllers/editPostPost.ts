import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma/index.js";
import asyncHandler from "express-async-handler";
import { type PostParams, type EditPostRequest } from "../models/types.js";

const prisma = new PrismaClient();

const editPostPost = asyncHandler(async function editPost(
    req: Request<PostParams, {}, EditPostRequest>,
    res: Response
) {
    if (req.user) {
        const user = await prisma.user.findUnique({
            where: {
                username: req.user.username,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const postId = req.params.postId;

        const post = await prisma.post.update({
            data: {
                title: req.body.title,
                content: req.body.content,
                authorId: user.id,
            },
            where: {
                id: Number(postId),
            },
        });

        res.status(200).json({
            message: "success",
            post: post,
        });
    } else {
        throw new Error("User not authenticated");
    }
});

export { editPostPost };
