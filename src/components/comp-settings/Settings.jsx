'use client'
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

const Settings = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [new_username, setNewUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("/api/auth/edit", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                password_confirmation,
                new_username
            }),
        });

        const data = await response.json();
        if (response.ok) {
            Swal.fire({
                title: "Success",
                text: data.message,
                icon: "success",
                confirmButtonColor: "#72bf78",
                confirmButtonText: "OK",
                color: "#D9D9D9",
                background: "#212529",
            });

            if (data.message.includes("login kembali")) {
                document.cookie = "session=; Max-Age=0; path=/"; // Hapus cookies
                window.location.href = "/auth"; // Redirect ke halaman login
            } else {
                setUsername("");
                setPassword("");
                setPasswordConfirmation("");
            }
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
        console.error("Error saat mengedit data user:", error);
        Swal.fire({
            title: "Error",
            text: "Terjadi kesalahan, coba lagi nanti",
            icon: "error",
            confirmButtonColor: "#72bf78",
            confirmButtonText: "OK",
            color: "#D9D9D9",
            background: "#212529",
        });
    }
};


  return (
    <div className="settings-akun">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-5 d-flex flex-column justify-content-center align-items-center">
                    <h3>Account settings</h3>
                    <FaUser className="icon-user" />
                  </div>
                  <div className="col-md-7 border-left">
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        className="form-control col-md-12"
                        placeholder="Input Username lama"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <input
                        type="text"
                        className="form-control col-md-12 mt-3"
                        placeholder="Username baru"
                        name="username"
                        value={new_username}
                        onChange={(e) => setNewUsername(e.target.value)}
                      />
                      <input
                        type="password"
                        className="form-control col-md-12 mt-3"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <input
                        type="password"
                        className="form-control col-md-12 mt-3"
                        placeholder="Konfirmasi password"
                        name="password_confirmation"
                        value={password_confirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                      />
                      <div className="button-editpw d-flex justify-content-end mt-3">
                        <button type="submit" className="btn col-md-4">
                          Edit
                        </button>
                      </div>
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

export default Settings;
