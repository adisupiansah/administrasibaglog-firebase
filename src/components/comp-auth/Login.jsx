"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import LogoLogistik from "@/app/img/logoLogistik.png";
import polres from "@/app/img/logoPolres.png";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { setAdminName } = useUser();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    // Cek jika username dan password kosong
    if (!username || !password) {
      Swal.fire({
        title: "Error",
        text: "Username dan password harus diisi",
        icon: "error",
        confirmButtonColor: "#72bf78",
        confirmButtonText: "OK",
        color: "#D9D9D9",
        background: "#212529",
      });
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Berhasil",
          text: data.message,
          icon: "success",
          color: "#D9D9D9",
          background: "#212529",
        }).then(() => {
         
          const tester = setAdminName(data.username);
          console.log('data user:',tester);
          

          sessionStorage.setItem("username", data.username);
          router.push("/admin");
        })
      } else {
        Swal.fire({
          title: "Error",
          text: data.message,
          icon: "error",
          confirmButtonColor: "#72bf78",
          confirmButtonText: "OK",
          color: "#D9D9D9",
          background: "#212529",
        });
      }
    } catch (error) {
      Swal.fire("Error", "Terjadi kesalahan saat login", "error");
    }
  };

  // cek apakah user sudah login
  const ceklogin = async () => {
    const response = await fetch('/api/auth/ceklogin')
    if(response.ok) {
      router.push('/admin');
    }
  }
  
  useEffect(() => {
    ceklogin();
  }, [])
  return (
    <div className="container login">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card col-md-6 p-4">
              <div className="card-body">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <div className="d-flex gap-2">
                    <Image
                      src={polres}
                      width={84}
                      height={100}
                      alt="logo-polreskarimun"
                    />
                    <Image
                      src={LogoLogistik}
                      width={75}
                      height={100}
                      alt="logo-logistik"
                    />
                  </div>
                  <div className="d-flex flex-column col-md-12 mt-3 text-center">
                    <h3>Login</h3>
                    <p>WELCOME TO SILOGAD RESKARIMUN</p>
                    <form onSubmit={handleLogin}>
                      <input
                        type="text"
                        className="form-control "
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />

                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <button type="submit" className="btn btn-login col-md-12">
                        login
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
