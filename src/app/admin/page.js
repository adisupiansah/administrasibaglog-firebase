'use client';
import CardView from "@/components/comp-dashboard/CardView";
import BarChart from "@/components/comp-dashboard/Chart";
import Title from "@/components/comp-title/Title";
import { useEffect } from "react";
import  { useRouter } from "next/navigation";
export default function Home() {
  // const router = useRouter();

  // useEffect(() => {
  //   const cek = async () => {
  //     const response = await fetch('/api/auth/ceklogin', {
  //       credentials: 'include',
  //     });
  //     if(!response.ok) {
  //       router.push('/auth');
  //     }
  //   }
  //   cek();
  // }, [])
  return (
    <div>
      <Title title={"Dashboard"}/>
      <CardView/>
      <BarChart/>
    </div>
  );
}
