import GenreBox from "@/components/genre-box";
import AdminLayout from "@/layouts/admin-layouts";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function ComicView() {
  const router = useRouter();
  const [comic, setComic] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [chapters, setChapters] = useState([]);

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

  const getComic = useCallback(() => {
    if (!router.query.id) {
      return;
    }
    setLoading1(true);
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/comics?id=" + router.query.id)
      .then((res) => {
        if (res.data.status) {
          setComic(res.data.data);
          getChapters(res.data.data.id);
        }
        setLoading1(false);
      })
      .catch((err) => {
        if (err.response.status === 404) router.push("/admin/comics");
        throw err;
      });
  }, [router, getChapters]);

  useEffect(() => {
    getComic();
  }, [getComic]);

  return (
    <AdminLayout>
      {!loading1 ? (
        <div className="w-auto h-auto bg-[rgba(255,255,255,0.1)] rounded-xl p-4 flex transition-all duration-500 ease-in-out">
          <div className="w-[200px] h-fit flex items-center justify-center rounded-xl overflow-hidden">
            <picture>
              <img
                src={
                  "https://xfs-s114.batcg.org/thumb/W600/ampi/238/23853a4b110c2c0c632fd1e61bebd23ac7dee3a9_512_728_244673.jpeg?acc=ga30DMRpKCiUtKLnQ4ldMQ&exp=1683911851"
                }
                alt=""
              />
            </picture>
          </div>
          <div
            className={`w-full h-auto overflow-hidden flex flex-col text-xs transition-all duration-500 ease-in-out text-gray-300`}
          >
            <div className="grid grid-cols-12">
              <div className="w-full h-12 flex items-center px-4 col-span-4">
                Title
              </div>
              <div className="w-full h-12 flex items-center px-4 col-span-8">
                {comic.title}
              </div>
            </div>
            <div className="grid grid-cols-12">
              <div className="w-full h-12 flex items-center px-4 col-span-4">
                Alternative Title
              </div>
              <div className="w-full h-12 flex items-center px-4 col-span-8">
                {comic.alt_title}
              </div>
            </div>
            <div className="grid grid-cols-12">
              <div className="w-full h-12 flex items-center px-4 col-span-4">
                Genres
              </div>
              <div className="w-full h-auto flex items-center px-4 col-span-8 flex-wrap gap-2 py-2">
                {JSON.parse(comic.genres) !== null &&
                  JSON.parse(comic.genres).map((g, ind) => <GenreBox id={g} key={ind} />)}
              </div>
            </div>
            <div className="grid grid-cols-12">
              <div className="w-full h-12 flex items-center px-4 col-span-4">
                Language
              </div>
              <div className="w-full h-12 flex items-center px-4 col-span-8">
                Indonesia
              </div>
            </div>
            <div className="grid grid-cols-12">
              <div className="w-full h-12 flex items-center px-4 col-span-4">
                Original Language
              </div>
              <div className="w-full h-12 flex items-center px-4 col-span-8">
                Jepang
              </div>
            </div>
            <div className="grid grid-cols-12">
              <div className="w-full h-12 flex items-center px-4 col-span-4">
                Status
              </div>
              <div className="w-full h-12 flex items-center px-4 col-span-8">
                On going
              </div>
            </div>
            <div className="grid grid-cols-12">
              <div className="w-full h-12 flex items-center px-4 col-span-4">
                Latest updated at
              </div>
              <div className="w-full h-12 flex items-center px-4 col-span-8">
                {moment().fromNow()}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="w-full mt-8 rounded-xl bg-[rgba(255,255,255,0.1)] p-4">
        <div className="text-xs text-gray-400">Chapters</div>
        <div className="flex flex-col mt-4 gap-2">
          {chapters !== null &&
            chapters.map((c) => (
              <div
                className="w-full h-12 bg-[rgba(255,255,255,0.1)] flex items-center px-4 rounded-xl"
                key={c.id}
              >
                <div className="text-xs">Chapter 1: Oneshot</div>
                <div className="ml-auto flex gap-2">
                  <div className="w-6 h-6 flex items-center justify-center bg-[rgba(255,255,255,0.1)] hover:bg-red-500 rounded-lg text-xs transition-all duration-100 ease-in-out cursor-pointer">
                    <i className="fa-solid fa-pencil"></i>
                  </div>
                  <div className="w-6 h-6 flex items-center justify-center bg-[rgba(255,255,255,0.1)] hover:bg-red-500 rounded-lg text-xs transition-all duration-100 ease-in-out cursor-pointer">
                    <i className="fa-solid fa-x"></i>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </AdminLayout>
  );
}
