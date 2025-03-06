import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import Navbar from "@/components/component-client/comp-navigasi/Navbar";
import { Roboto } from "next/font/google";
import { UserProvider } from "@/context/UserContext";


const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Tambahkan variasi yang diperlukan
});

export const metadata = {
  // LOGAD (LOGISTIK ADMINISTRASI)
  title: "BAGLOG POLRES KARIMUN",
  description: "APLIKASI LOGISTIK POLRES KARIMUN",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <UserProvider>
        <body>
          <Navbar />
        </body>
        {children}
      </UserProvider>
    </html>
  );
}
