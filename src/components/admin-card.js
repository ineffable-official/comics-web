import moment from "moment";
import Link from "next/link";

export default function AdminCard({ data }) {
  return (
    <Link
      href={"/admin/comics/view?id=" + data.id}
      className="w-full h-auto my-4 rounded-2xl overflow-hidden relative"
    >
      <picture>
        <img
          src="https://xfs-s114.batcg.org/thumb/W600/ampi/238/23853a4b110c2c0c632fd1e61bebd23ac7dee3a9_512_728_244673.jpeg?acc=ga30DMRpKCiUtKLnQ4ldMQ&exp=1683911851"
          alt=""
        />
      </picture>
      <div className="w-full h-auto p-4 absolute bottom-0 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[#323232]">
        <div className="text-xl font-semibold">{data.title}</div>
        <div className="text-xs">{moment(data.updated_at).fromNow()}</div>
      </div>
    </Link>
  );
}
