import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function AdminChapterList({ comic }) {
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

  const chapterDestroy = (targetId) => {
    axios
      .delete(process.env.NEXT_PUBLIC_API_URL + "/chapters?id=" + targetId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.status) {
          getChapters(comic.id);
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    setToken(token ? token : null);
  }, []);

  useEffect(() => {
    getChapters(comic.id);
  }, [getChapters, comic.id]);

  return (
    <div className="flex flex-col mt-4 gap-2">
      {chapters !== null &&
        chapters.map((c) => (
          <div
            className="w-full h-12 bg-[rgba(255,255,255,0.1)] flex items-center px-4 rounded-xl hover:bg-[rgba(255,255,255,0.25)] transition-all duration-100 ease-in-out"
            key={c.id}
          >
            <div className="text-xs">{`Chapter ${c.chap_num}${
              c.title ? `: ${c.title}` : ""
            }`}</div>
            <div className="ml-auto flex gap-2">
              <div className="w-6 h-6 flex items-center justify-center bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.25)] rounded-lg text-xs transition-all duration-100 ease-in-out cursor-pointer">
                <i className="fa-solid fa-pencil"></i>
              </div>
              <div
                className="w-6 h-6 flex items-center justify-center bg-[rgba(255,255,255,0.1)] hover:bg-red-500 rounded-lg text-xs transition-all duration-100 ease-in-out cursor-pointer"
                onClick={(e) => {
                  chapterDestroy(c.id);
                }}
              >
                <i className="fa-solid fa-x"></i>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
