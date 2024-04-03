import { getRequestContext } from "@cloudflare/next-on-pages";
import { DrizzleD1Database } from "drizzle-orm/d1";
import { db } from "@/lib/db";

export const runtime = "edge";

export const getDrizzleDB = (): DrizzleD1Database => {
  return db(getRequestContext().env.DB);
};
