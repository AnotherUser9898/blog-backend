import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma/index.js";
import asyncHandler from "express-async-handler";
import { type PostParams, type EditPostRequest } from "../models/types.js";

const prisma = new PrismaClient();

const deletePostDELETE = asyncHandler(async function deletePost(
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

        await prisma.post.delete({
            where: {
                id: Number(postId),
            },
        });

        const posts = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                updatedAt: true,
            },
            where: {
                authorId: user.id,
            },
        });

        res.status(200).json({
            message: "success",
            posts: posts,
        });
    } else {
        throw new Error("User not authenticated");
    }
});

export { deletePostDELETE };
