import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function Card({ data }) {
  const [lastChapter, setLastChapter] = useState([]);

  const getLastChapter = useCallback(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL + `/chapters?comicId=${data.id}&take=3`
      )
      .then((res) => {
        setLastChapter(res.data.data);
      })
      .catch((err) => {
        throw err;
      });
  }, [data.id]);

  useEffect(() => {
    getLastChapter();
  }, [getLastChapter]);

  return (
    <Link
      href={"/comics/view?id=" + data.id}
      className="lg:w-[250px] min-w-[200px] h-auto my-4 rounded-2xl overflow-hidden relative"
    >
      <picture>
        <img src={data.images} className="w-full" alt="" />
      </picture>

      <div className="w-full h-auto p-4 absolute bottom-0 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[#323232]">
        <div className="text-xl font-semibold truncate">{data.title}</div>
        <div className="grid grid-cols-3 gap-2 my-2">
          {lastChapter !== null &&
            lastChapter.map((c) => (
              <Link
                href={"/comics/read?chapid=" + c.id}
                className="w-full h-auto py-1 px-2 text-[0.7rem] bg-[rgba(255,255,255,0.25)] rounded-lg hover:bg-[rgba(255,255,255,0.5)] transition-all duration-100 ease-in-out"
                key={c.id}
              >
                {`Chapter ${c.chap_num}`}
              </Link>
            ))}
        </div>
        <div className="text-xs">{moment(data.updated_at).fromNow()}</div>
      </div>
    </Link>
  );
}
