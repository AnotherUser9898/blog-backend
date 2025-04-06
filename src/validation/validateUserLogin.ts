import { body } from "express-validator";

const validateUserLogin = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("username is compulsory")
        .isEmail()
        .withMessage("username must be a valid email"),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password must be atleast 6 characters long"),
];

export { validateUserLogin };
