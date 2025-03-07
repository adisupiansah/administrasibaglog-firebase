"use client";
import { useState } from "react";

const LoginNew = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");

  const sendOtp = async () => {
    setMessage("Mengirim kode OTP...");
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setStep(2); // Pindah ke step input OTP
        setMessage("Kode OTP telah dikirim ke email.");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Gagal mengirim kode OTP.");
    }
  };

  const verifyOtp = async () => {
    setMessage("Memverifikasi kode OTP...");
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Login berhasil! Redirecting...");
        setTimeout(() => window.location.href = "/dashboard", 2000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Gagal verifikasi OTP.");
    }
  };

  return (
    <div className="container">
      <h2>Login dengan OTP</h2>

      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button onClick={sendOtp}>Kirim Kode OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Masukkan kode OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button onClick={verifyOtp}>Verifikasi OTP</button>
        </>
      )}

      <p>{message}</p>
    </div>
  );
}

export default LoginNew