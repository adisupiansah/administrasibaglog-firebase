import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Menerima dan validasi body
    const body = await request.json();

    if (!body || typeof body !== "object" || !body.username || !body.password) {
      return NextResponse.json(
        {
          message: "Bad Request: Body tidak valid",
        },
        { status: 400 }
      );
    }

    const { username, password } = body;

    // Cari user di database
    const user = await prisma.user.findUnique({
      where: { username },
    });

    // Jika user tidak ditemukan
    if (!user) {
      return NextResponse.json({ message: "Username Salah" }, { status: 404 });
    }

    // Jika password salah
    if (user.password !== password) {
      return NextResponse.json({ message: "Password salah" }, { status: 401 });
    }

    // Jika login berhasil, kembalikan username dan set cookie
    const response = NextResponse.json(
      {
        message: "Login berhasil",
        username: user.username, // Kirim username ke frontend
      },
      { status: 200 }
    );

    response.cookies.set("isLoggedIn", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600, // 1 jam
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Terjadi kesalahan server:", error.message);
    return NextResponse.json(
      {
        message: "Terjadi kesalahan saat login",
        error: error?.message || "Kesalahan tidak diketahui",
      },
      { status: 500 }
    );
  }
}
