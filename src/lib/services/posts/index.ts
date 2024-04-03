import { posts } from "../../db";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { DrizzleD1Database } from "drizzle-orm/d1";
import { BaseStorage } from "@/lib/services/base";

export const insertPostsSchema = createInsertSchema(posts);
export const selectPostsSchema = createSelectSchema(posts);

export type PostInsert = z.infer<typeof insertPostsSchema>;
export type PostSelect = z.infer<typeof selectPostsSchema>;

// export const createPost = (db: DrizzleD1Database, post: PostInsert) => {
// 	return db.insert(posts).values(post)
// }
//
// export const updatePost = (db: DrizzleD1Database, data: { id: string, update: PostInsert}) => {
// 	return db.update(posts).set(data.update).where(eq(posts.id, data.id))
// }
//
// export const selectPosts = (db: DrizzleD1Database) => {
// 	return db.select().from(posts).all()
// }
//
// export const deletePost = (db: DrizzleD1Database, id: string) => {
// 	return db.delete(posts).where(eq(posts.id, id))
// }

export class PostsController extends BaseStorage {

  createPost = (post: PostInsert) => {
    return this.db.insert(posts).values(post);
  };

  updatePost = (data: { id: string; update: PostInsert }) => {
    return this.db.update(posts).set(data.update).where(eq(posts.id, data.id));
  };

  selectPosts = () => {
    return this.db.select().from(posts).all();
  };

  deletePost = (id: string) => {
    return this.db.delete(posts).where(eq(posts.id, id));
  };
}
