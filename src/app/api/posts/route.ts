import { PostsController } from "@/lib/services";
import { NextRequest, NextResponse } from "next/server";
import { insertPostsSchema } from "@/lib/services";
import { auth } from "@/lib/auth"

export const runtime = 'edge';

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } },
) {
  const controller = new PostsController();
  const session = await auth()
  console.log("AUTH HANDLER")
  console.log(session)
  return NextResponse.json(await req.json());
  /*
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
  */
}
