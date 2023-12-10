import express from "express";
import userRouter from "./routes/users.router";

const app = express();
app.use(express.json());

const PORT = 3000;

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
