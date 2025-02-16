import { pgTable, serial, text, json, timestamp } from "drizzle-orm/pg-core";

// ✅ New table for Transactions
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  action: text("action").notNull(),
  params: json("params").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
}); 

// ✅ New table for Social Posts
export const socialPosts = pgTable("social_posts", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  platform: text("platform").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// ✅ New table for AI Agents
export const agents = pgTable("agents", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  actionType: text("action_type").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});