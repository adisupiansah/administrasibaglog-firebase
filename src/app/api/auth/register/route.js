import prisma from "@/libs/prisma";

export async function POST (request) {
    try {
        const body = await request.json();

        
        if (!body || typeof body !== 'object') {
            return new Response(
                JSON.stringify({ message: "Payload tidak valid" }),
                { status: 400 }
            );
        }

        const { username, password } = body;
        // validasi jika data tidak lengkap
        if (!username || !password) {
            return new Response (
                JSON.stringify ({ message: "Data tidak lengkap" }),
                { status: 400 }
            )
        }

        // cek apakah username sudah terdaftar
        const Daftaruser = await prisma.user.findUnique({
            where: {
                username
            }
        })

        if (Daftaruser) {
            return new Response (
                JSON.stringify ({ message: "Username sudah terdaftar" }),
                { status: 400 }
            )
        }

        // cek konfimarmasi password
        if (password !== body.password_confirmation){
            return new Response (
                JSON.stringify ({ message: "Password tidak sama" }),
                { status: 400 }
            )
        }

        // buat data di database
        const newUser = await prisma.user.create({
            data: {
                username,
                password
            }
        })

        return new Response(
            JSON.stringify({message: "Berhasil menyimpan data",data: newUser}),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
             }
        );

    } catch (error) {
        console.error('Error euy:', error.stack);
            return new Response (
            JSON.stringify({ message: "Terjadi kesalahan saat menyimpan data", error: error.message }),
            { status: 500 }
        )    
    }
}