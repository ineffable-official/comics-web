import ChapterList from "@/components/chapter-list";
import ComicInfo from "@/components/comic-info";
import MainLayout from "@/layouts/main-layout";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function ComicsPage() {
  const router = useRouter();
  const [comic, setComic] = useState([]);

  const getComic = useCallback((comidId) => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + `/comics?id=${comidId}`)
      .then((res) => {
        if (res.data.status) {
          setComic(res.data.data);
        }
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  useEffect(() => {
    if (router.query.id) {
      getComic(router.query.id);
    }
  }, [getComic, router.query.id]);

  return (
    <MainLayout>
      <div className="flex flex-col mt-8">
        {comic ? <ComicInfo comic={comic} /> : ""}
        <div className="flex flex-col bg-[rgba(255,255,255,0.1)] rounded-xl p-8 mt-8">
          <div className="text-xs text-gray-400">Chapters</div>
          {comic ? <ChapterList comic={comic} /> : ""}
        </div>
      </div>
    </MainLayout>
  );
}
