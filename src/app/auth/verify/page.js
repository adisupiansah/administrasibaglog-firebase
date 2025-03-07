'use client';
import { useEffect } from "react";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function VerifyLogin() {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();

    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = localStorage.getItem("emailForSignIn");

      if (!email) {
        email = prompt("Masukkan email Anda untuk verifikasi:");
      }

      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {
          localStorage.removeItem("emailForSignIn");

          Swal.fire({
            icon: "success",
            title: "Login Berhasil!",
            text: "Anda akan diarahkan ke halaman admin.",
            timer: 3000,
            showConfirmButton: false,
          });

          setTimeout(() => {
            router.push("/admin"); // Redirect ke halaman admin
          }, 3000);
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Gagal Login",
            text: error.message,
          });
        });
    }
  }, []);

  return <h2>Verifikasi Login...</h2>;
}
