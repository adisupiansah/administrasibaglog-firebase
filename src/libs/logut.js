import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export const useHooksLogout = () => {
  const router = useRouter();

  const { setAdminName } = useUser();

  const handleLogout = async () => {
    Swal.fire({
      title: "Apakah Anda Yakin ?",
      text: "Anda akan keluar dari aplikasi",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#72bf78",
      cancelButtonColor: "#c62e2e",
      confirmButtonText: "Ya, Keluar!",
      cancelButtonText: "Tidak",
      color: "#D9D9D9",
      background: "#212529",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });
        if (res.ok) {
          sessionStorage.removeItem("username");
          setAdminName(null);
          router.push("/auth");
        }
      }
    });
  };

  return { handleLogout };
};
