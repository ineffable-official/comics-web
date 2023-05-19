import VisitorGraph from "@/components/visitor-graph";
import AdminLayout from "@/layouts/admin-layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function Admin() {
  const router = useRouter();
  const [token, setToken] = useState();
  const [accessGranted, setAccessGranted] = useState(false);

  const tokenVerify = useCallback(
    (apiToken) => {
      axios
        .get(
          process.env.NEXT_PUBLIC_API_URL + "/token/verify?token=" + apiToken
        )
        .then((res) => {
          if (res.data.status) {
            localStorage.setItem("admin-token", apiToken);
            router.push("/admin");
          }
        })
        .catch((err) => {
          throw err;
        });
    },
    [router]
  );

  useEffect(() => {
    const adminToken = localStorage.getItem("admin-token");

    if (router.query.token) {
      tokenVerify(router.query.token);
    }

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
  }, [router, tokenVerify]);

  if (accessGranted) {
    return (
      <AdminLayout>
        <div className="grid grid-cols-3 gap-4">
          <div className="w-full h-auto rounded-xl bg-blue-500 p-4">
            <div className="text-sm font-semibold text-gray-200">
              Total comics
            </div>
            <div className="w-full h-24 flex items-center justify-center text-5xl text-gray-100">
              0
            </div>
          </div>
          <div className="w-full h-auto rounded-xl bg-purple-500 p-4">
            <div className="text-sm font-semibold text-gray-200">
              Total chapters
            </div>
            <div className="w-full h-24 flex items-center justify-center text-5xl text-gray-100">
              0
            </div>
          </div>
          <div className="w-full h-auto rounded-xl bg-green-500 p-4">
            <div className="text-sm font-semibold text-gray-200">
              Total users
            </div>
            <div className="w-full h-24 flex items-center justify-center text-5xl text-gray-100">
              0
            </div>
          </div>
        </div>
        <VisitorGraph token={token} />
      </AdminLayout>
    );
  } else {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Please wait
      </div>
    );
  }
}
