import { Hono } from "hono";

const user = new Hono();

user.get("/", (c) => {
  return c.json({ message: "Your first user" });
});

export default user;
