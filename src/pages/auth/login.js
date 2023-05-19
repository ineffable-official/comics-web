import axios from "axios";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    axios
      .post(process.env.NEXT_PUBLIC_API_URL + `/login`, form)
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
          Hello again!
        </div>
        <div className="w-[300px] text-gray-500 text-sm my-4 text-center">
          Login untuk segera memulai obrolan dengan yang lainnya
        </div>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="flex mb-2">
            <div className="w-11 h-11 border-[1px] flex items-center justify-center rounded-l-lg text-gray-500">
              <i className="fa-light fa-user-circle"></i>
            </div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username or Email"
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
          <button
            type="submit"
            className={`w-full h-11 rounded-lg bg-[#3A54AA] ${
              !loading ? "hover:bg-[#31478f]" : ""
            } text-white text-sm font-medium mb-2 flex items-center justify-center`}
            disabled={loading}
          >
            {loading ? (
              <div className="w-8 h-8 flex items-center justify-center animate-spin">
                <i className="fa-light fa-spinner"></i>
              </div>
            ) : (
              "LOGIN"
            )}
          </button>
          <div className="w-full h-11 rounded-lg bg-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.1)] text-black text-sm font-medium flex items-center justify-center">
            <Link href="/auth/signup">SIGNUP</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
