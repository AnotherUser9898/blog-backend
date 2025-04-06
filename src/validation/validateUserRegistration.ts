import { body } from "express-validator";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

const validateUserRegistration = [
    body("firstname")
        .trim()
        .notEmpty()
        .withMessage("Firstname cannot be empty")
        .isAlpha()
        .withMessage("Firstname can only contain alphabets"),
    body("lastname")
        .trim()
        .notEmpty()
        .withMessage("Lastname cannot be empty")
        .isAlpha()
        .withMessage("Lastname can only contain alphabets"),
    body("username")
        .trim()
        .notEmpty()
        .withMessage("username is compulsory")
        .isEmail()
        .withMessage("username must be a valid email")
        .custom(isUserAlreadyRegistered)
        .withMessage("User already registered"),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password must be atleast 6 characters long"),
];

async function isUserAlreadyRegistered(username: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        if (user) {
            return Promise.reject("User already registered");
        } else {
            return true;
        }
    } catch (error) {
        return Promise.reject("Internal server error");
    }
}

export { validateUserRegistration, isUserAlreadyRegistered };
