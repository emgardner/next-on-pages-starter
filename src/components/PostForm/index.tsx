"use client";

export default function PostForm() {
  async function onPost(e) {
    e.preventDefault()
    console.log(e) 

    // const post = {
    //   title: data.get("title"),
    //   content: data.get("content"),
    // };
    const post = {
      title: "title",
      content: "content",
    };
    fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify(post),
    }).then((response) => console.log(response.json()));

    // "use server";
    // const db = getDrizzleDB();
    // const postsController = new PostsController(db);
    // const value = {
    //   title: data.get("title"),
    //   content: data.get("content"),
    // };

    // const result = insertPostsSchema.safeParse(value);
    // if (result.success) {
    //   const newPost = await postsController.createPost(result.data);
    //   revalidatePath("/");
    // }
  }

  return(
      <form
        className="flex flex-col space-y-4 py-4 shadow rounded px-4"

        onSubmit={onPost}
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
  )
}
