import "bootstrap/dist/css/bootstrap.css";
import "@/app/css/admin.css";
import Navigasibar from "@/components/Navigasi/Navigasibar";
import CekClientLogin from "@/libs/CekClientLogin";
import ProtectedLayout from "./ProtectedLayout";

export const metadata = {
  // LOGAD (LOGISTIK ADMINISTRASI)
  title: "SALOKA RESKARIMUN",
  description:
    "SALOKA - SISTEM ADMINISTRASI LOGISTIK POLRES KARIMUN",
};

export default function AdminLayout({ children }) {
  return (
    <>
      <ProtectedLayout>
        {children}
      </ProtectedLayout>
    </>
  );
}
