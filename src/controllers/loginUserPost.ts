import { PrismaClient } from "../../generated/prisma/index.js";
import { Request, Response } from "express";
import { compare } from "bcryptjs";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import "dotenv/config";
import { type LoginRequest } from "../models/types.js";

const prisma = new PrismaClient();

const loginUserPost = asyncHandler(async function loginUser(
    req: Request<{}, {}, LoginRequest>,
    res: Response
) {
    const { username, password }: { username: string; password: string } =
        req.body;

    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordCorrect = await compare(password, user.password);

    console.log({ password, userPassword: user.password });
    console.log({ isPasswordCorrect });

    if (!isPasswordCorrect) {
        throw new Error("Incorrect password");
    }

    const tokenObject: JwtPayload = {
        username,
        id: user.id,
    };

    if (process.env.SECRET_KEY) {
        const SECRET: Secret = process.env.SECRET_KEY;

        jwt.sign(tokenObject, SECRET, (err, token) => {
            if (err) {
                throw new Error("Error signing token");
            }
            res.status(200).json({
                message: "success",
                token,
            });
        });
    }
});

export { loginUserPost };
