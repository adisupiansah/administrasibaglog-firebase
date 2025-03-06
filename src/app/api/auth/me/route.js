import { NextResponse } from "next/server";

export async function GET(request) {
  const username = request.cookies.get("username")?.value;

  if (!username) {
    return NextResponse.json({ message: "User not logged in" }, { status: 401 });
  }

  // Cari user di database berdasarkan username
  const user = await prisma.user.findUnique({
    where: { username },
    select: { username: true }, // Hanya ambil field yang diperlukan
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ username: user.username });
}
