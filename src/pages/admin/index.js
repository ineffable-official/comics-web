import AdminLayout from "@/layouts/admin-layouts";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function Admin() {
  const router = useRouter();
  const [token, setToken] = useState();
  const [accessGranted, setAccessGranted] = useState(false);

  const tokenVerify = useCallback((apiToken) => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/token/verify?token=" + apiToken)
      .then((res) => {
        if (res.data.status) {
          localStorage.setItem("admin-token", apiToken);
          router.push("/admin");
        }
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  useEffect(() => {
    const adminToken = localStorage.getItem("admin-token");
    if (!adminToken && router.query.token) {
      const apiToken = router.query.token;
      if (apiToken) {
        tokenVerify(apiToken);
      }
    }
    if (adminToken) {
      setToken(adminToken);
      setAccessGranted(true);
    }

    if (!adminToken && !router.query.token) {
      router.push("/auth/login");
    }

  }, [router]);

  if (accessGranted) {
    return <AdminLayout></AdminLayout>;
  } else {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Please wait
      </div>
    );
  }
}
