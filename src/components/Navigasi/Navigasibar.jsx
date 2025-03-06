"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaUserNurse } from "react-icons/fa";
import { useHooksLogout } from "@/libs/logut";
import { FaUser } from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import logo from "@/app/img/logoLogistik.png";
import Link from "next/link";
import 'animate.css'

const Navigasibar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenDisposisi, setIsDropdownOpenDisposisi] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  // state untuk buka dropdown user
  const [isDropdownOpenUser, setIsDropdownOpenUser] = useState(false);

  const { adminName, setAdminName } = useUser();

  const pathname = usePathname();

  // Logout
  const {handleLogout} = useHooksLogout()

  if(pathname === '/admin/auth') return null

  // useeffect untuk menangkap username
useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setAdminName(storedUsername);
    }
  }, [setAdminName]);

  useEffect(() => {
    if (pathname === "/admin") {
      setActiveMenu("Dashboard");
      setActiveSubMenu(null);
    } else if (pathname.startsWith("/admin/notadinas")) {
      setActiveMenu("Nota Dinas");

      if (pathname === "/admin/notadinas") {
        setActiveSubMenu("Nota keluar");
      } else if (pathname === "/admin/notadinas/input") {
        setActiveSubMenu("Input");
      } else if (pathname === "/admin/notadinas/pengajuan") {
        setActiveSubMenu("Pengajuan");
      } else if (pathname === "/admin/notadinas/arsip") {
        setActiveSubMenu("Arsip");
      }
    } else if (pathname.startsWith("/admin/disposisi")) {
      setActiveMenu("Disposisi");

      if (pathname === "/admin/disposisi") {
        setActiveSubMenu("Disposisi masuk");
      } else if (pathname === "/admin/disposisi/input") {
        setActiveSubMenu("Input disposisi");
      }
    }
  }, [pathname]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsDropdownOpenDisposisi(false);
  };

  const toggleDropdownDisposisi = () => {
    setIsDropdownOpenDisposisi(!isDropdownOpenDisposisi);
    setIsDropdownOpen(false);
  };

  const toggleDropdownUser = () => {
    setIsDropdownOpenUser(!isDropdownOpenUser);
    setIsDropdownOpen(false);

  };

  const handleSubMenuClick = () => {
    setIsDropdownOpen(false);
    setIsDropdownOpenDisposisi(false);
  };

  const menuActiveClass = (menu) => (activeMenu === menu ? "active" : "");
  const submenuActiveClass = (submenu) => (activeSubMenu === submenu ? "active" : "");
  

  return (
    <div className="fixed-top">
      <nav className="navbar">
        <div className="container">
          <a className="navbar-brand d-flex justify-content-center align-items-center" href="/">
            <Image src={logo} alt="logo" width={56} height={65} />
            <div className="d-flex flex-column mx-2">
              <span>BAGIAN LOGISTIK</span>
              <span>POLRES KARIMUN</span>
            </div>
          </a>

          <div className="d-flex justify-content-end">
            <button className="btn-user d-flex justify-content-center align-items-center" onClick={toggleDropdownUser}>
              <FaUserNurse className="icon"/>
            </button>
            {isDropdownOpenUser && (
              <div className="shadow-sm open-user animate__animated animate__zoomIn ">
                <div className="d-flex justify-content-center align-items-center user-profile">
                    <FaUser className="icon-user"/>
                    <h1 className="mx-2">{adminName || 'Guest'}</h1>
                </div>

                <div className="garis-pembatas"></div>

                <div className="user-settings col-md-12 d-flex justify-content-center align-items-center">
                    <Link className="btn-settings col-md-12 text-center" href='/admin/account/settings'>settings</Link> 
                </div>
                <div className="user-logout">
                    <button className="btn-logout col-md-12" onClick={handleLogout}>Logout</button> 
                </div>
              </div>
            )}
          </div>

        </div>
      </nav>
      <nav className="navbar-nav shadow-sm">
        <div className="container">
          <div className="d-flex justify-content-center align-items-center gap-3">
            <Link href="/admin" className={`pointer ${menuActiveClass("Dashboard")}`}>
              Dashboard
            </Link>
            <div className="dropdown">
              <div
                className={`pointer dropdown-toggle ${menuActiveClass("Nota Dinas")}`}
                onClick={toggleDropdown}
              >
                {activeMenu === "Nota Dinas" ? activeSubMenu : "Nota Dinas"}
              </div>
              {isDropdownOpen && (
                <div className="dropdown-menu show mt-3 animate__animated animate__zoomIn">
                  <Link
                    href="/admin/notadinas"
                    className={`dropdown-item ${submenuActiveClass("Nota keluar")}`}
                    onClick={handleSubMenuClick}
                  >
                    Nota keluar
                  </Link>
                  <Link
                    href="/admin/notadinas/input"
                    className={`dropdown-item ${submenuActiveClass("Input")}`}
                    onClick={handleSubMenuClick}
                  >
                    Input
                  </Link>
                  <Link
                    href="/admin/notadinas/pengajuan"
                    className={`dropdown-item ${submenuActiveClass("Pengajuan")}`}
                    onClick={handleSubMenuClick}
                  >
                    Pengajuan
                  </Link>
                  <Link
                    href="/admin/notadinas/arsip"
                    className={`dropdown-item ${submenuActiveClass("Arsip")}`}
                    onClick={handleSubMenuClick}
                  >
                    Arsip
                  </Link>
                </div>
              )}
            </div>
            <div className="dropdown">
              <div
                className={`pointer dropdown-toggle ${menuActiveClass("Disposisi")}`}
                onClick={toggleDropdownDisposisi}
              >
                {activeMenu === "Disposisi" ? activeSubMenu : "Disposisi"}
              </div>
              {isDropdownOpenDisposisi && (
                <div className="dropdown-menu show mt-3 animate__animated animate__zoomIn">
                  <Link
                    href="/admin/disposisi"
                    className={`dropdown-item ${submenuActiveClass("Disposisi masuk")}`}
                    onClick={handleSubMenuClick}
                  >
                    Disposisi masuk
                  </Link>
                  <Link
                    href="/admin/disposisi/input"
                    className={`dropdown-item ${submenuActiveClass("Input disposisi")}`}
                    onClick={handleSubMenuClick}
                  >
                    Input disposisi
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigasibar;
