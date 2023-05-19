import Link from "next/link";
import { useState } from "react";

export default function AdminSidebar() {
  const [menus, setMenus] = useState([
    {
      name: "Dashboard",
      link: "/admin",
      have_submenu: false,
      sub_menus: null,
      icon: "dashboard",
    },
    {
      name: "Comics",
      link: "/admin/comics",
      have_submenu: false,
      sub_menus: null,
      icon: "books",
    },
    {
      name: "Data Master",
      link: "/admin/data-master",
      have_submenu: false,
      icon: "box",
    },
  ]);
  return (
    <div className="min-w-[300px] h-screen p-2 flex flex-col bg-[rgb(24,24,24)]">
      <Link
        href={'/'}
        className="w-full flex gap-2 items-center mb-2 transition-all duration-100 ease-in-out rounded-lg"
      >
        <div className="w-11 h-11 flex items-center justify-center">
        </div>
        <div className="font-sm text-xs text-gray-300">MY COMICS</div>
      </Link>
      {menus !== null &&
        menus.map((m, i) =>
          !m.have_submenu ? (
            <Link
              href={m.link}
              className="w-full flex gap-2 items-center hover:bg-[rgba(255,255,255,0.1)] transition-all duration-100 ease-in-out rounded-lg"
              key={i}
            >
              <div className="w-11 h-11 flex items-center justify-center">
                <i className={`fa-light fa-${m.icon}`}></i>
              </div>
              <div className="font-sm text-xs text-gray-300">{m.name}</div>
            </Link>
          ) : (
            <div className="flex flex-col" key={i}>
              <div
                className="w-full flex gap-2 items-center hover:bg-[rgba(255,255,255,0.1)] transition-all duration-100 ease-in-out rounded-lg"
                key={i}
              >
                <div className="w-11 h-11 flex items-center justify-center">
                  <i className={`fa-light fa-${m.icon}`}></i>
                </div>
                <div className="font-sm">{m.name}</div>
              </div>
              {m.sub_menus.map((sm, ind) => (
                <Link
                  href={sm.link}
                  className="w-full flex gap-2 items-center hover:bg-[rgba(255,255,255,0.1)] transition-all duration-100 ease-in-out rounded-lg"
                  key={ind}
                >
                  <div className="w-11 h-11 flex items-center justify-center"></div>
                  <div className="font-sm">{sm.name}</div>
                </Link>
              ))}
            </div>
          )
        )}
      <div className="mt-auto w-full p-2 flex gap-2 bg-blue-500 rounded-xl items-center">
        <div className="w-8 h-8 flex items-center justify-center rounded-full overflow-hidden">
          <picture>
            <img
              src={
                "https://secure.gravatar.com/avatar/e5d559aa821d4d66798a76007effd1d9?s=512&d=mm&r=g"
              }
              alt=""
            />
          </picture>
        </div>
        <div className="text-xs">Faizun Musthofa</div>
        <div className="w-8 h-8 ml-auto bg-blue-600 hover:bg-blue-700 cursor-pointer transition-all duration-100 ease-in-out flex items-center justify-center rounded-lg">
          <i className="fa-light fa-arrow-right-from-bracket"></i>
        </div>
      </div>
    </div>
  );
}
