import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma/index.js";
import asyncHandler from "express-async-handler";
import { type PostParams } from "../models/types.js";

const prisma = new PrismaClient();

const getPostGET = asyncHandler(async function getPost(
    req: Request<PostParams>,
    res: Response
) {
    const { postId } = req.params;

    const post = await prisma.post.findUnique({
        select: {
            title: true,
            content: true,
            updatedAt: true,
            description: true,
            author: {
                select: {
                    firstname: true,
                    lastname: true,
                },
            },
        },
        where: {
            id: Number(postId),
        },
    });

    if (!post) {
        throw new Error("Post not found");
    }

    res.status(200).json({
        message: "success",
        post: post,
    });
});

export { getPostGET };
