import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma/index.js";
import asyncHandler from "express-async-handler";
import { type CreatePostRequest } from "../models/types.js";

declare module "express-serve-static-core" {
    interface Request {
        user?: { username: string; id: number };
    }
}

const prisma = new PrismaClient();

const createPostPost = asyncHandler(async function (
    req: Request<{}, {}, CreatePostRequest>,
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

        const post = await prisma.post.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                authorId: user.id,
            },
        });

        res.status(201).json({
            message: "Post created",
            post: post,
        });
    } else {
        throw new Error("User not found");
    }
});

export { createPostPost };
