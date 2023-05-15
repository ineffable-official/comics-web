import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full h-16 flex flex-wrap px-8 items-center">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-all duration-100 ease-in-out cursor-pointer mr-4 gap-1 flex-col">
        <div className="w-6 h-[3px] bg-[rgba(255,255,255,0.5)] rounded-lg"></div>
        <div className="w-4 h-[3px] bg-[rgba(255,255,255,0.5)] rounded-lg"></div>
        <div className="w-6 h-[3px] bg-[rgba(255,255,255,0.5)] rounded-lg"></div>
      </div>
      <Link href={"/"} className="h-10 flex items-center">MYCOMICS</Link>
      <form action="/" method="post" className="mx-auto flex">
        <div className="flex">
          <input
            type="search"
            name="s"
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
      <div className="flex items-center">
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
      </div>
    </div>
  );
}
