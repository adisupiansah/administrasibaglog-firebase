'use client'
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const CekClientLogin = () => {
  const router = useRouter();
  useEffect(() => {
    const cek = async () => {
      const response = await fetch("/api/auth/ceklogin", {
        credentials: "include",
      });
      if (!response.ok) {
        router.push("/auth");
      }
    };
    cek();
  }, []);
  return <div></div>;
};

export default CekClientLogin;
