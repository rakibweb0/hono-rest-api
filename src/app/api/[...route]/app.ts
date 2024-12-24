import { Hono } from "hono";
import { authMiddleware } from "./middlewares/auth";
import loginRouter from "./routes/login";
import taskRouter from "./routes/task";
import userRouter from "./routes/user";

const app = new Hono().basePath("/api");

// Apply auth middleware to protected routes
app.use("/user/*", authMiddleware);

// All routes
const routes = app
  .route("/login", loginRouter)
  .route("/task", taskRouter)
  .route("/user", userRouter);

// Default route
app.get("/hello", (c) => {
  return c.json({ message: "Welcome to Hono js" });
});

export default app;

export type AppType = typeof routes;