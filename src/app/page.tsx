import { FormEvent } from "react";
import PostForm from "@/components/PostForm"
import {
  // selectPosts,
  // updatePost,
  // createPost,
  // deletePost,
  // updatePostSchema,
  insertPostsSchema,
  PostsController,
  PostSelect,
} from "@/lib/services";
import { revalidatePath } from "next/cache";
import { auth } from '@/lib/auth';

export const runtime = "edge";

export default async function Home() {

  const postsController = new PostsController();
  const posts = await postsController.selectPosts();
  const session = await auth()
  console.log(session)

  async function onSubmit(data: FormData) {
    "use server";
    const db = getDrizzleDB();
    const postsController = new PostsController(db);
    const value = {
      title: data.get("title"),
      content: data.get("content"),
    };
    const result = insertPostsSchema.safeParse(value);
    if (result.success) {
      const newPost = await postsController.createPost(result.data);
      revalidatePath("/");
    }
  }

  async function onDelete(post: PostSelect) {
    "use client";
    fetch(`/api/posts/${post.id}`, {
      method: "DELETE",
      body: JSON.stringify(post),
    }).then((response) => response.json());
    revalidatePath("/");
  }

  return (
    <>
      <div>Test Form</div>
      <form
        className="flex flex-col space-y-4 py-4 shadow rounded px-4"
        action={onSubmit}
      >
        <span className="text-2xl font-bold">Posts</span>
        <div className="flex flex-col space-y-1">
          <label htmlFor="title">Title</label>
          <input name="title" />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="content">Content</label>
          <input name="content" />
        </div>
        <button
          type="submit"
          className="block px-4 py-2 bg-black text-white rounded"
        >
          Submit
        </button>
      </form>
      <PostForm />
      <div className="flex flex-col space-y-2">
        {posts.map((post) => {
          return (
            <div
              className="flex flex-col border border-black shadow-lg bg-white space-y-4 rounded py-2 px-4"
              key={post.id}
            >
              <span className="text-lg">{post.title}</span>
              <p>{post.content}</p>
              {/*
                  <button
                    className=""
                    onClick={() => onDelete(post)}
                  >DELETE</button>
                  */}
            </div>
          );
        })}
      </div>
    </>
  );
}
