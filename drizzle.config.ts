// drizzle.config.ts
import type { Config } from "drizzle-kit";
export default {
  schema: "./src/lib/db/*.schema.ts",
  out: "./migrations",
  driver: "d1",
  dbCredentials: {
    wranglerConfigPath: "wrangler.toml",
    dbName: "test-d1",
  },
} satisfies Config;
