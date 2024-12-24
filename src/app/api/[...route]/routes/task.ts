import { Hono } from "hono";

const task = new Hono()
  .get("/", (c) => {
    return c.json({ message: "Your first task" });
  })
  .post("/", (c) => {
    return c.json({ message: "Create your task" });
  })
  .get("/:id", (c) => {
    const { id } = c.req.param();
    return c.json({ message: `Your task id is ${id}` });
  });

export default task;
