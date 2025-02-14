import { defineConfig } from "drizzle-kit";
// import "dotenv/config"; // Load .env variables

export default defineConfig({
  schema: "./db/schema.ts",
//   out: "./drizzle",
  dialect: "postgresql",
//   driver: "pg",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_HrAW64RnBuUb@ep-shiny-band-a86af4sz-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"
  },
});
