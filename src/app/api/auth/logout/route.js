import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({message: 'logout berhasil'})

    // Hapus cookie dengan name isLoggedIn
    response.cookies.set('isLoggedIn', '', {
        expires: new Date(0)
    })

    return response
}