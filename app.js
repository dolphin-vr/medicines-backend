import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";

// import authRouter from "./routes/auth-router.js";
// import userRouter from "./routes/user-router.js";
import shopRouter from "./routes/api/shop-router.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
// app.use(express.static("public"));

// app.use("/api/auth", authRouter);
// app.use("/api/users", userRouter);
app.use("/api/shops", shopRouter);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
