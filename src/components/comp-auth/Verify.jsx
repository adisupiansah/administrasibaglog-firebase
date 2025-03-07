"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Verify() {
  const [message, setMessage] = useState("Memverifikasi...");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const verifyLogin = async () => {
      const email = localStorage.getItem("emailForSignIn"); // Email yang sebelumnya digunakan
      const oobCode = searchParams.get("oobCode"); // Kode dari URL

      if (!email || !oobCode) {
        setMessage("Kode verifikasi tidak valid.");
        return;
      }

      try {
        const response = await fetch("/api/auth/verifylogin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, oobCode }),
        });

        const data = await response.json();
        if (response.ok) {
          setMessage("Login berhasil! Redirect...");
          setTimeout(() => router.push("/dashboard"), 2000); // Redirect setelah sukses
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        setMessage("Gagal melakukan verifikasi.");
      }
    };

    verifyLogin();
  }, [searchParams, router]);

  return (
    <div className="container flex justify-center items-center h-screen">
      <h2>Verifikasi Login</h2>
      <p>{message}</p>
    </div>
  );
}
