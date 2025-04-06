import express from "express";
import { registerRouter } from "./routes/registerRouter.js";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { loginRouter } from "./routes/loginRouter.js";
import { postRouter } from "./routes/postRouter.js";
import cors from "cors";

const PORT = process.env.PORT;
const app = express();

app.use(cors());

app.use(express.json());

app.use("/register", registerRouter);

app.use("/login", loginRouter);

app.use("/post", postRouter);

app.use(handleError);
if (PORT) {
    app.listen(PORT, () => {
        console.log(`Sever listening on port ${PORT}`);
    });
}

function handleError(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.status(500).send(err.stack);
}
