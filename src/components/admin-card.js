import moment from "moment";
import Link from "next/link";
export default function AdminCard({ data }) {
  return (
    <Link
      href={"/admin/comics/view?id=" + data.id}
      className="w-full h-auto my-4 rounded-2xl overflow-hidden relative"
    >
      <picture>
        <img src={data.images} className={"w-full h-auto"} alt="" />
      </picture>
      <div className="w-full h-auto p-4 absolute bottom-0 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[#323232]">
        <div className="text-xl font-semibold truncate" title={data.title}>
          {data.title}
        </div>
        <div className="text-xs">{moment(data.updated_at).fromNow()}</div>
        <div className="flex mt-2 gap-2">
          <Link
            href={`/admin/comics?comicId=${data.id}&edit=true`}
            className="w-6 h-6 text-xs flex items-center justify-center rounded-lg bg-gray-500 hover:bg-blue-500 text-gray-300"
          >
            <i className="fa-light fa-pencil"></i>
          </Link>
          {/* <Link
            href={`/admin/comics?comidId=${data.id}&edit=true`}
            className="w-6 h-6 text-xs flex items-center justify-center rounded-lg bg-gray-500 hover:bg-red-500 text-gray-300"
          >
            <i className="fa-light fa-x"></i>
          </Link> */}
        </div>
      </div>
    </Link>
  );
}
