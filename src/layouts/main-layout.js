import Navbar from "@/components/navbar";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function MainLayout({ children }) {
  return (
    <>
      <div
        className="w-full h-screen overflow-hidden bg-[rgb(32,32,32)] text-white text-sm"
        style={poppins.style}
      >
        <Navbar />
        <main className="w-full h-screen overflow-y-scroll px-16 pb-32">{children}</main>
      </div>
    </>
  );
}
