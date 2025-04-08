import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma/index.js";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();

const getAllPostsGET = asyncHandler(async function getAllPosts(
    req: Request,
    res: Response
) {
    const posts = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            updatedAt: true,
            author: {
                select: {
                    firstname: true,
                    lastname: true,
                },
            },
        },
    });

    if (posts.length == 0) {
        res.status(200).json({
            message: "No posts found",
            posts: [],
        });
        return;
    }

    res.status(200).json({
        message: "success",
        posts: posts,
    });
});

export { getAllPostsGET };
