"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/libs/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import Navigasibar from "@/components/Navigasi/Navigasibar";

export default function ProtectedLayout({ children }) {
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
      <div className="d-flex justify-content-center align-items-center vh-100 ">
        <div className="loader">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="body">
      <Navigasibar />
      {children}
    </div>
  );
}
