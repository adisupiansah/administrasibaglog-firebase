import prisma from "@/libs/prisma";

export async function PUT(request) {
    try {
        const body = await request.json();
        const { username, password, password_confirmation, new_username } = body;

        // Cek apakah username baru sudah terdaftar
        if (new_username) {
            const existingUser = await prisma.user.findUnique({
                where: {
                    username: new_username,
                },
            });

            if (existingUser) {
                return new Response(
                    JSON.stringify({ message: "Username sudah terdaftar" }),
                    { status: 400 }
                );
            }
        }

        // Validasi password dan konfirmasi password jika ada perubahan password
        if (password && password !== password_confirmation) {
            return new Response(
                JSON.stringify({ message: "Password tidak sama" }),
                { status: 400 }
            );
        }

        // Ambil username dari body request
        const sessionUsername = username;  // Username yang sedang login

        // Cek user yang login
        const existingUser = await prisma.user.findUnique({
            where: { username: sessionUsername },
        });

        if (!existingUser) {
            return new Response(
                JSON.stringify({ message: "User tidak ditemukan" }),
                { status: 404 }
            );
        }

        // Update data user
        const updatedUser = await prisma.user.update({
            where: { username: sessionUsername },
            data: {
                // Update password jika ada
                ...(password && { password }),

                // Update username jika ada
                ...(new_username && { username: new_username }),
            },
        });

        return new Response(
            JSON.stringify({
                message: "Data berhasil diupdate",
                data: updatedUser,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error saat mengedit data user:", error);
        return new Response(
            JSON.stringify({ message: "Gagal mengedit data user" }),
            { status: 500 }
        );
    }
}
