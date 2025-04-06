import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma/index.js";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();

const getAllPostsGET = asyncHandler(async function getAllPosts(
    req: Request,
    res: Response
) {
    const posts = await prisma.post.findMany();

    if (posts.length == 0) {
        res.status(404).json({
            message: "No posts found",
            posts: [],
        });
    }

    res.status(200).json({
        message: "success",
        posts: posts,
    });
});

export { getAllPostsGET };
