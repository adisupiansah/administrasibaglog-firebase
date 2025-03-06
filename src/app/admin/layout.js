import "bootstrap/dist/css/bootstrap.css";
import "@/app/css/admin.css";
import Navigasibar from "@/components/Navigasi/Navigasibar";
import CekClientLogin from "@/libs/CekClientLogin";

export const metadata = {
  // LOGAD (LOGISTIK ADMINISTRASI)
  title: "SILOGAD RESKARIMUN",
  description:
    "SILOGAD - SISTEM INFORMASI LOGISTIK DAN ADMINISTRASI RESKARIMUN",
};

export default function AdminLayout({ children }) {
  return (
    <>
      <div className="body">
        {/* <CekClientLogin /> */}
        <Navigasibar />
        {children}
      </div>
    </>
  );
}
