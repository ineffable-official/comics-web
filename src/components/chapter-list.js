import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function ChapterList({ comic }) {
  const [loading2, setLoading2] = useState(true);
  const [chapters, setChapters] = useState([]);
  const [token, setToken] = useState();

  const getChapters = useCallback((comidId) => {
    setLoading2(false);
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/chapters?comicId=" + comidId)
      .then((res) => {
        setChapters(res.data.data);
        setLoading2(false);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  useEffect(() => {
    getChapters(comic.id);
  }, [getChapters, comic.id]);

  return (
    <div className="flex flex-col mt-4 gap-2">
      {chapters !== null &&
        chapters.map((c) => (
          <Link
            href={`/comics/read?chapid=${c.id}`}
            className="w-full h-12 bg-[rgba(255,255,255,0.1)] flex items-center px-4 rounded-xl hover:bg-[rgba(255,255,255,0.25)] transition-all duration-100 ease-in-out"
            key={c.id}
          >
            <div className="text-xs">{`Chapter ${c.chap_num}${
              c.title ? `: ${c.title}` : ""
            }`}</div>
            <div className="ml-auto flex gap-2">
              <div className="text-xs text-gray-300">
                {moment(c.updated_at).fromNow()}
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
