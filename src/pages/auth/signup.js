import axios from "axios";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function Signup() {
  const [loading, setLoading] = useState();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);
    if (form.get("password") !== form.get("verify_password")) {
      alert("Verification Password not same");
      return;
    }

    axios
      .post(process.env.NEXT_PUBLIC_API_URL + `/signup`, form)
      .then((res) => {
        const t = setTimeout(() => {
          setLoading(false);
          if (res.data.status) {
            if (res.data.data.user.role === "user") {
              localStorage.setItem("token", res.data.data.token);
              router.push("/");
            } else {
              router.push(`/admin?token=${res.data.data.token}`);
            }
          } else {
            alert(res.data.message);
          }
        }, 500);

        return () => {
          clearTimeout(t);
        };
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center"
      style={poppins.style}
    >
      <div className="p-8">
        <div className="w-full text-center text-3xl font-bold">
          Create an account
        </div>
        <div className="w-[300px] text-gray-500 text-sm my-4 text-center">
          Buat akun untuk menemukan hal baru
        </div>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="flex mb-2">
            <div className="w-11 h-11 border-[1px] flex items-center justify-center rounded-l-lg text-gray-500"></div>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Yourname"
              className="border-[1px] w-[300px] h-11 border-l-0 px-4 outline-none rounded-r-lg text-sm"
            />
          </div>
          <div className="flex mb-2">
            <div className="w-11 h-11 border-[1px] flex items-center justify-center rounded-l-lg text-gray-500">
              <i className="fa-light fa-user-circle"></i>
            </div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="border-[1px] w-[300px] h-11 border-l-0 px-4 outline-none rounded-r-lg text-sm"
            />
          </div>
          <div className="flex mb-2">
            <div className="w-11 h-11 border-[1px] flex items-center justify-center rounded-l-lg text-gray-500">
              <i className="fa-light fa-at"></i>
            </div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="border-[1px] w-[300px] h-11 border-l-0 px-4 outline-none rounded-r-lg text-sm"
            />
          </div>
          <div className="flex mb-2">
            <div className="w-11 h-11 border-[1px] flex items-center justify-center rounded-l-lg text-gray-500">
              <i className="fa-light fa-key"></i>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="border-[1px] w-[300px] h-11 border-l-0 px-4 outline-none rounded-r-lg text-sm"
            />
          </div>
          <div className="flex mb-2">
            <div className="w-11 h-11 border-[1px] flex items-center justify-center rounded-l-lg text-gray-500">
              <i className="fa-light fa-key"></i>
            </div>
            <input
              type="password"
              name="verify_password"
              id="verify-password"
              placeholder="Verification Password"
              className="border-[1px] w-[300px] h-11 border-l-0 px-4 outline-none rounded-r-lg text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full h-11 rounded-lg bg-[#3A54AA] hover:bg-[#31478f] text-white text-sm font-medium mb-2 flex items-center justify-center"
          >
            {loading ? (
              <div className="w-8 h-8 flex items-center justify-center animate-spin">
                <i className="fa-light fa-spinner"></i>
              </div>
            ) : (
              "SIGNUP"
            )}
          </button>
          <div className="w-full h-11 rounded-lg bg-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.1)] text-black text-sm font-medium flex items-center justify-center">
            <Link href="/auth/login">LOGIN</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
