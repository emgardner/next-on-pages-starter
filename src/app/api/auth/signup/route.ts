import { NextRequest, NextResponse } from "next/server";
import { getDrizzleDB } from "@/lib/cf";
import { UserService } from "@/lib/services"

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const userService = new UserService();
    const result = await userService.signupUser(await req.json())
    console.log(result)
    return NextResponse.json({ user: result }, { status: 201 });
  } catch(err) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
