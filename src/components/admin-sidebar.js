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
    <div className="w-[300px] h-screen p-2 flex flex-col">
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
              <div className="font-sm">{m.name}</div>
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
    </div>
  );
}
