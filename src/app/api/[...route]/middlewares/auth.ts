import { bearerAuth } from "hono/bearer-auth";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";

export const authMiddleware = bearerAuth({
  verifyToken: async (token, c) => {
    const cookieToken = getCookie(c, "token");
    if (cookieToken !== token) return false;

    try {
      const payload = await verify(token, process.env.JWT_SECRET! || "");
      if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        throw new Error("Token expired");
      }
      return true;
    } catch (error) {
      console.error("Token verification failed:", error);
      return false;
    }
  },
});