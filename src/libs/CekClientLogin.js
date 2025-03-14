"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/libs/Firebase";
import { onAuthStateChanged } from "firebase/auth";

const CekLogin = () => {
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/auth");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return null; // Tidak menampilkan apa-apa setelah login
}

export default CekLogin;