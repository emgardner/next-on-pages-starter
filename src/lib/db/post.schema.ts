import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";
import { users } from "./auth.schema";

export const posts = sqliteTable("posts", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .notNull()
    .primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  created_at: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});
