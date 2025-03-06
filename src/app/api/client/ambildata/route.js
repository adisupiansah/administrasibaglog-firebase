import prisma from "@/libs/prisma";

export async function GET (request) {
    try {
        const data = await prisma.ambilnomor.findMany({
            orderBy: {
                id: 'desc'
            }
        })

        return new Response (
            JSON.stringify(data), {
                status: 200,
                headers: {'Content-Type': 'application/json'}
            }
        )
    } catch (error) {
        console.error("Terjadi keslahaan saat mengambil data", error);
        return new Response (
            JSON.stringify({msg: "Terjadi kesalahan saat mengambil data"}), {
                status: 500,
                headers: {'Content-Type': 'application/json'}
            }
        )
    }
}