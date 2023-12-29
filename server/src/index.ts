import express from "express";
import cors from "cors";
import { config } from "dotenv";
config();

import userRouter from "./routes/users.router";
import postRouter from "./routes/posts.router";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
