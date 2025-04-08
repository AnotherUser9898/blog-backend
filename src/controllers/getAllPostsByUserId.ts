import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma/index.js";
import asyncHandler from "express-async-handler";

declare module "express-serve-static-core" {
    interface Request {
        user?: { username: string; id: number };
    }
}

const prisma = new PrismaClient();

const getAllPostsByUserIdGET = asyncHandler(async function getAllPosts(
    req: Request,
    res: Response
) {
    if (!req.user) {
        throw new Error("User not logged in");
    }
    const posts = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            updatedAt: true,
        },
        where: {
            authorId: Number(req.user.id),
        },
    });

    if (posts.length == 0) {
        console.log("inside if");
        res.status(200).json({
            message: "No posts found",
            posts: [],
        });
        return;
    }

    console.log("outside if");

    res.status(200).json({
        message: "success",
        posts: posts,
    });
});

export { getAllPostsByUserIdGET };
