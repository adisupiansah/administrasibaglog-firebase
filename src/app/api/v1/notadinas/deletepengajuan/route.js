import prisma from "@/libs/prisma";

export async function DELETE(request) {
    try {
        // Hapus seluruh data dari tabel "ambilnomor"
        await prisma.ambilnomor.deleteMany();

        return new Response(
            JSON.stringify({ message: 'Semua data berhasil dihapus' }),
            { status: 200 }
        );
    } catch (error) {
        console.error({ error: 'Terjadi kesalahan saat menghapus data' });
        return new Response(
            JSON.stringify({ error: 'Terjadi kesalahan saat menghapus data' }),
            { status: 500 }
        );
    }
}
