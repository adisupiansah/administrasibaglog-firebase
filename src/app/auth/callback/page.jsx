"use client";
import { useEffect, useState } from "react";
import { auth } from "@/libs/Firebase";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

export default function CallbackPage() {
  const [message, setMessage] = useState("Memproses login...");

  useEffect(() => {
    async function handleLogin() {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
          email = prompt("Masukkan email Anda:");
        }

        if (email) {
          try {
            await signInWithEmailLink(auth, email, window.location.href);
            window.localStorage.removeItem("emailForSignIn");
            setMessage("Login berhasil!");
          } catch (error) {
            setMessage("Login gagal: " + error.message);
          }
        } else {
          setMessage("Login gagal: Email tidak ditemukan.");
        }
      }
    }

    handleLogin();
  }, []);

  return <div>{message}</div>;
}
