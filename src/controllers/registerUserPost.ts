import { validationResult } from "express-validator";
import { PrismaClient, Prisma } from "../../generated/prisma/index.js";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();

const registerUserPost = asyncHandler(async function registerUser(
    req: Request<{}, {}, Prisma.UserCreateInput>,
    res: Response
): Promise<void> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.throw();
    } else {
        const {
            firstname,
            lastname,
            username,
            password,
        }: {
            firstname: string;
            lastname: string;
            username: string;
            password: string;
        } = req.body;

        // has password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: hashedPassword,
            },
        });
        console.log(user);

        res.json({ user: user, message: "success" });
    }
});

export { registerUserPost };
