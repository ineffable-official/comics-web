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
          src={data.images}
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
