import { db } from "../db/db";
import { transactions, socialPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Sonic } from "@/lib/sonic";
import { Zerebro } from "@/lib/zerebro";

export async function handleOnChainAction(userId: string, action: string, params: any) {
  try {
    const result = await Sonic.executeTransaction(action, params);
    await db.insert(transactions).values({
      userId,
      action,
      params,
      createdAt: new Date(),
    });
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function handleSocialAction(userId: string, platform: string, content: string) {
  try {
    const result = await Zerebro.postContent(platform, content);
    await db.insert(socialPosts).values({
      userId,
      platform,
      content,
      createdAt: new Date(),
    });
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getTransactions(userId: string) {
  return await db.select().from(transactions).where(eq(transactions.userId, userId));
}

export async function getSocialPosts(userId: string) {
  return await db.select().from(socialPosts).where(eq(socialPosts.userId, userId));
}
