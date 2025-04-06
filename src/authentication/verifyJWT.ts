import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { type CreatePostRequest } from "../models/types.js";

declare module "express-serve-static-core" {
    interface Request {
        user?: { username: string; id: number };
    }
}

function verifyJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        throw new Error("User not logged in");
    }

    if (!process.env.SECRET_KEY) {
        throw new Error("Secret key not found");
    }
    const SECRET_KEY: Secret = process.env.SECRET_KEY;
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            throw new Error("Invalid token");
        }

        req.user = user as { username: string; id: number };

        next();
    });
}

export { verifyJWT };
