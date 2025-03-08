"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import LogoLogistik from "@/app/img/logoLogistik.png";
import polres from "@/app/img/logoPolres.png";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { auth } from "@/libs/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      Swal.fire({
        icon: "success",
        title: "Login berhasil!",
        text: "Selamat datang, " + userCredential.user.email,
        showConfirmButton: false,
        timer: 1500,
        background: "#1e1e1e",
        color: "#D9D9D9",
      }).then(() => {
        router.push("/admin");
      });
    } catch (error) {
      setMessage( error.message);
    }
  };

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
                    {message && (
                      <div className="alert alert-danger" role="alert">
                        {message}
                      </div>
                    )}
                    <form onSubmit={handleLogin}>
                      <input
                        type="email"
                        className="form-control "
                        placeholder="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
