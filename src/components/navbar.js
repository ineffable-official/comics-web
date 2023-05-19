import axios from "axios";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

export default function Navbar() {
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [loadUser, setLoadUser] = useState();

  const getUser = useCallback((tkn) => {
    setLoadUser(true);
    if (!tkn) {
      setLoadUser(false);
      return;
    }

    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/account", {
        headers: { Authorization: `Bearer ${tkn}` },
      })
      .then((res) => {
        setTimeout(() => {
          if (res.data.status) {
            setUser(res.data.data);
          }
          setLoadUser(false);
        }, 1000);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
        }
        throw err;
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token ? token : null);
  }, []);

  useEffect(() => {
    if (token) {
      getUser(token);
    }
  }, [getUser, token]);

  return (
    <div className="w-full h-16 flex flex-wrap px-8 items-center">
      {/* <div className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-all duration-100 ease-in-out cursor-pointer mr-4 gap-1 flex-col">
        <div className="w-6 h-[3px] bg-[rgba(255,255,255,0.5)] rounded-lg"></div>
        <div className="w-4 h-[3px] bg-[rgba(255,255,255,0.5)] rounded-lg"></div>
        <div className="w-6 h-[3px] bg-[rgba(255,255,255,0.5)] rounded-lg"></div>
      </div> */}
      <Link href={"/"} className="h-10 flex items-center">
        Nimetoon
      </Link>
      <div className="relative mx-auto">
        <form action="comics" className="flex" autoComplete="off">
          <div className="flex">
            <input
              type="search"
              name="search"
              id="search"
              className="w-[25vw] h-10 rounded-l-xl bg-[rgba(255,255,255,0.1)] px-4 outline-none"
              placeholder="Search..."
            />
          </div>
          <button
            type="submit"
            className="w-10 h-10 flex items-center justify-center rounded-r-xl bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)]"
          >
            <i className="fa-light fa-search"></i>
          </button>
        </form>
      </div>

      <div className="flex items-center">
        {loadUser !== true ? (
          user ? (
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 flex items-center justify-center rounded-full overflow-hidden">
                <picture>
                  <img src={user.images} alt="" />
                </picture>
              </div>
              <div className="text-xs text-gray-400 font-medium">
                {user.name}
              </div>
            </div>
          ) : (
            <Link
              href={"/auth/login"}
              className="py-2 px-4 bg-gray-500 hover:bg-blue-500 transition-all duration-100 ease-in-out rounded-lg"
            >
              LOGIN
            </Link>
          )
        ) : (
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full overflow-hidden animate-spin">
              <i className="fa-light fa-spinner"></i>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
