import { DrizzleD1Database } from "drizzle-orm/d1";
import { getDrizzleDB } from "@/lib/cf";

export class BaseStorage {
  db: DrizzleD1Database;
  constructor(database: DrizzleD1Database) {
    this.db = getDrizzleDB();
  }
}
