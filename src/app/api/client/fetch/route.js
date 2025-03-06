import prisma from "@/libs/prisma";
import { incrementNomorNotaDinas } from "@/libs/incrementNotadinas";

export async function GET (request) {
    try {
        // ambil data terakhir dari table notadinas
        const lastNomorNotaDinas = await prisma.notadinas.findFirst({
            orderBy: { id: "desc" },
        })

        // ambil data terakhir dari table ambilnomor
        const lastNomor = await prisma.ambilnomor.findFirst({
            orderBy: { id: "desc" },
        })

        // Tentukan nomor terakhir
        const noNotaDinas = lastNomor?.no_pengajuan || lastNomorNotaDinas?.no_surat

        // validasi jika data tidak ditemukan di table notadinas dan ambilnomor buat format baru
        if (!noNotaDinas) {
            // jika tidak ada data sama sekali
            return new Response ({ no_pengajuan: 'B/ND-01/I/LOG./2024'}),
            { status: 200, headers: { 'Content-Type': 'application/json' }}
        }

        // nomor selanjutnya
        const nextNomorNotaDinasPengajuan = incrementNomorNotaDinas(noNotaDinas);

        return new Response(
            JSON.stringify({ no_pengajuan: nextNomorNotaDinasPengajuan }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
        return new Response ({ message: 'Terjadi kesalahan pada server'}),
        { status: 500, headers: { 'Content-Type': 'application/json' }}
    }
}