import AdminChapterList from "@/components/admin-chapter-list";
import ChapterForm from "@/components/chapter-form";
import AdminLayout from "@/layouts/admin-layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import AdminComicInfo from "@/components/admin-comic-info";

export default function ComicView() {
  const router = useRouter();
  const [comic, setComic] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [token, setToken] = useState();
  const [chapterForm, setChapterForm] = useState(false);

  const getComic = useCallback(() => {
    if (!router.query.id) {
      return;
    }
    setLoading1(true);
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/comics?id=" + router.query.id)
      .then((res) => {
        if (res.data.status) {
          if (res.data.data === null) {
            router.push("/admin/comics");
            return;
          }
          setComic(res.data.data);
        }
        setLoading1(false);
      })
      .catch((err) => {
        if (err.response.status === 404) router.push("/admin/comics");
        throw err;
      });
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    setToken(token ? token : null);
  }, []);

  useEffect(() => {
    getComic();
  }, [getComic]);

  return (
    <AdminLayout>
      {!loading1 ? comic ? <AdminComicInfo comic={comic} /> : "" : ""}
      <div className="w-full mt-8 rounded-xl bg-[rgba(255,255,255,0.1)] p-4">
        <div className="flex flex-col">
          <div className="w-full flex gap-2 items-center">
            <div className="text-xs text-gray-400">Chapters</div>
            <div
              className="w-6 h-6 ml-auto flex items-center justify-center bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.25)] rounded-lg text-xs transition-all duration-100 ease-in-out cursor-pointer"
              onClick={() => setChapterForm(!chapterForm)}
            >
              {chapterForm ? (
                <i className="fa-solid fa-x"></i>
              ) : (
                <i className="fa-solid fa-plus"></i>
              )}
            </div>
          </div>
          {chapterForm ? <ChapterForm comic={comic} /> : ""}
        </div>
        {comic ? <AdminChapterList comic={comic} /> : ""}
      </div>
    </AdminLayout>
  );
}
