import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { HTTPException } from "hono/http-exception";
import { sign } from "hono/jwt";
import { setCookie } from "hono/cookie";

const login = new Hono();

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
});

login.post("/", zValidator("json", schema), async (c) => {
  const { email, password } = await c.req.json();
  if (password !== "12345678") {
    throw new HTTPException(401, { message: "Invalid password" });
  }
  const payload = {
    email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
  };
  const token = await sign(payload, process.env.JWT_SECRET! || "");
  setCookie(c, "token", token);

  return c.json({
    payload,
    token,
  });
});

export default login;
