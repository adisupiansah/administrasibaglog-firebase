'use client';
import CardView from "@/components/comp-dashboard/CardView";
import BarChart from "@/components/comp-dashboard/Chart";
import Title from "@/components/comp-title/Title";
import { useEffect } from "react";
import  { useRouter } from "next/navigation";
import { auth } from "@/libs/Firebase";
import {onAuthStateChanged } from "firebase/auth";
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/auth");
      }
    })
    return () => unsubscribe();
  }, [router])
  

  return (
    <div>
      <Title title={"Dashboard"}/>
      <CardView/>
      <BarChart/>
    </div>
  );
}
