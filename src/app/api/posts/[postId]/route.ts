import { PostsController } from "@/lib/services";
import { NextRequest, NextResponse } from "next/server";
import { insertPostsSchema } from "@/lib/services";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } },
) {
  const controller = new PostsController();
  controller.deletePost(params.postId);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { postId: string } },
) {
  const controller = new PostsController();
  const updates = insertPostsSchema.safeParse(await req.json());
  if (updates.success) {
    const result = await controller.updatePost({
      id: params.postId,
      update: updates.data,
    });
    return NextResponse.json(result);
  } else {
    return NextResponse.json(updates.error, { status: 400 });
  }
}
