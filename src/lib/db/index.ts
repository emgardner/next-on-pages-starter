import { drizzle } from "drizzle-orm/d1";
export * from "./post.schema";
export * from "./auth.schema";

export const db = (d1: D1Database) => drizzle(d1);
