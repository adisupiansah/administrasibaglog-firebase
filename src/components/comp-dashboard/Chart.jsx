"use client";
import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { FaSquareMinus } from "react-icons/fa6";
import { FaWindowMaximize } from "react-icons/fa6";

Chart.register(...registerables); // Registrasi semua modul Chart.js

const BarChart = () => {
  const chartRef = useRef(null);
  const chartPolaRef = useRef(null);
  const chartInstance = useRef(null);
  const chart = useRef(null);
  const chart2 = useRef(null);

  const [hitungSeluruhNotadinas, setHitungSeluruhNotadinas] = useState(0);
  const [hitungHarwatNotadinas, setHitungHarwatNotadinas] = useState(0);
  const [hitungBMPNotadinas, setHitungBMPNotadinas] = useState(0);

  const [hitungSeluruhDisposisi, setHitungSeluruhDisposisi] = useState(0);
  const [hitungHarwatDisposisi, setHitungHarwatDisposisi] = useState(0);
  const [hitungBMPDisposisi, setHitungBMPDisposisi] = useState(0);

  const [hitungPengajuanNotaDinas, setHitungPengajuanNotaDinas] = useState(0);

  const [isOpen, setIsOpen] = useState({
    chart: false,
    chart2: false,
  })

  const groupByMonth = (data, dateField) => {
    const groupedData = Array(12).fill(0); // Array untuk 12 bulan
    data.forEach((item) => {
      const date = new Date(item[dateField]);
      const month = date.getMonth(); // 0 = Januari, 11 = Desember
      groupedData[month]++;
    });
    return groupedData;
  };

  const hitungNotadinas = async () => {
    try {
      const response = await fetch("/api/v1/notadinas/getnota");
      const data = await response.json();

      const notadinasByMonth = groupByMonth(data, "createdAt");
      setHitungSeluruhNotadinas(notadinasByMonth);

      const harwatByMonth = groupByMonth(
        data.filter((item) => item.type_notadinas === "notadinas Harwat"),
        "createdAt"
      );
      setHitungHarwatNotadinas(harwatByMonth);

      const BMPByMonth = groupByMonth(
        data.filter((item) => item.type_notadinas === "notadinas BMP"),
        "createdAt"
      );
      setHitungBMPNotadinas(BMPByMonth);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const hitungDisposisi = async () => {
    try {
      const response = await fetch("/api/v1/disposisi/getdisposisi");
      const data = await response.json();

      const disposisiByMonth = groupByMonth(data, "createdAt");
      setHitungSeluruhDisposisi(disposisiByMonth);

      const harwatByMonth = groupByMonth(
        data.filter((item) => item.type_disposisi === "disposisi Harwat"),
        "createdAt"
      );
      setHitungHarwatDisposisi(harwatByMonth);

      const BMPByMonth = groupByMonth(
        data.filter((item) => item.type_disposisi === "disposisi BMP"),
        "createdAt"
      );
      setHitungBMPDisposisi(BMPByMonth);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const hitungPengajuan = async () => {
    try {
      const response = await fetch('/api/client/ambildata')
      const data = await response.json()

      const pengajuanByMonth = groupByMonth(data, 'createdAt')
      setHitungPengajuanNotaDinas(pengajuanByMonth)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  } 

  const InisialisasiChart = () => {
    if (chart.current !== null) {
      chart.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;
    const data = {
      labels: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
      datasets: [
        {
          label: "Nota Dinas Keluar",
          data: hitungSeluruhNotadinas,
          backgroundColor: "rgb(198, 46, 46)",
          borderColor: 1,
        },
        {
          label: "Disposisi Masuk",
          data: hitungSeluruhDisposisi,
          backgroundColor: "rgb(114,191,120)",
          borderColor: 1,
        },
        {
          label: "Pengajuan Notadinas",
          data: hitungPengajuanNotaDinas,
          backgroundColor: "rgb(170, 96, 200)",
          borderColor: 1,
        },
      ],
    };
    const options = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "#373A40", // Warna garis kotak-kotak di sumbu Y
          },
        },
        x: {
          grid: {
            color: "#373A40", // Warna garis kotak-kotak di sumbu X
          },
        },
      },
    };
    // Membuat instance Chart untuk ctx
    chart.current = new Chart(ctx, {
      type: "bar",
      data: data,
      options: options,
    });

    // Grafik kedua
    if(chart2.current){
      chart2.current.destroy();
    }

    const cpr = chartPolaRef.current.getContext("2d");
    if(!cpr) return;
    const dataPola = {
      labels: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
      datasets: [
        {
          label: "Nota Dinas Keluar (Harwat)",
          data: hitungHarwatNotadinas,
          backgroundColor: "rgb(250, 188, 63)",
          borderColor: 1,
        },
        {
          label: "Nota Dinas Keluar (BMP)",
          data: hitungBMPNotadinas,
          backgroundColor: "rgb(197, 145, 0)",
          borderColor: 1,
        },
        {
          label: "Disposisi Masuk (Harwat)",
          data: hitungHarwatDisposisi,
          backgroundColor: "rgb(38, 102, 207)",
          borderColor: 1,
        },
        {
          label: "Disposisi Masuk (BMP)",
          data: hitungBMPDisposisi,
          backgroundColor: "rgb(4, 56, 139)",
          borderColor: 1,
        },
      ],
    };

    const optionsCpr = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "#373A40", // Warna garis kotak-kotak di sumbu Y
          },
        },
        x: {
          grid: {
            color: "#373A40", // Warna garis kotak-kotak di sumbu X
          },
        },
      },
    };

    // Membuat instance Chart untuk cpr
    chart2.current = new Chart(cpr, {
      type: "bar",
      data: dataPola,
      options: optionsCpr,
    });
  };

 const toggleCard = (card) => {
     setIsOpen((prev) => ({
      ...prev,
      [card]: !prev[card],
     }))
   };

   useEffect(() => {
    if (
      (isOpen && chartRef.current) || 
      (isOpen && chartPolaRef.current)
    ) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      setTimeout(() => {
        InisialisasiChart(); // Pastikan dipanggil setelah render selesai
      }, 100);
    }
  }, [hitungSeluruhNotadinas, hitungSeluruhDisposisi, isOpen]);
  

  useEffect(() => {
    hitungNotadinas();
    hitungDisposisi();
    hitungPengajuan();
  }, []);

  return (
    <div className="mychart">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-mychart">

              <div className="d-flex justify-content-between align-items-center">
                  <span className='text-center flex-grow-1 text-minimize'>
                    {isOpen.chart ? "" : "Chart Data Tertutup"}
                  </span>

                  <span className='fs-4 cursor-pointer text-light' onClick={() => toggleCard('chart')}>
                    {isOpen.chart ? <FaSquareMinus /> : <FaWindowMaximize />}
                  </span>
              </div>

              {isOpen.chart && (
                <div className={`card-body card-bar ${isOpen.chart ? "show" : "close"}`}>
                  <canvas ref={chartRef} className="charts"></canvas>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-12 col-sm-12 my-4">
            <div className="card card-mychartPolar">
                <div className="d-flex justify-content-between align-items-center">
                      <span className='text-center flex-grow-1 text-minimize'>
                        {isOpen.chart2 ? "" : "Chart Data Tertutup"}
                      </span>

                      <span className='fs-4 cursor-pointer text-light' onClick={() => toggleCard('chart2')}>
                        {isOpen.chart2 ? <FaSquareMinus /> : <FaWindowMaximize />}
                      </span>
                </div>

              {isOpen.chart2 && (
                <div className={`card-body card-bar ${isOpen.chart2 ? "show" : "close"}`}>
                  <canvas ref={chartPolaRef} className="chartPola"></canvas>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
