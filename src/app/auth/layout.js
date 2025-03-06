import "bootstrap/dist/css/bootstrap.css";
import "@/app/css/auth.css";

export const metadata = {
  // LOGAD (LOGISTIK ADMINISTRASI)
  title: "Admin - auth",
  description:
    "SILOGAD - SISTEM INFORMASI LOGISTIK DAN ADMINISTRASI RESKARIMUN",
};

export default function AuthLayout({children}) {
  return (
    <div className="body-auth">
      {children}
    </div>
  )
}
