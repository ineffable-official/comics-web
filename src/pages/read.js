import ImageLoad from "@/components/image-load";
import ReaderLayout from "@/layouts/reader-layout";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function ReadPage() {
  const router = useRouter();
  const [chapter, setChapter] = useState({});
  const [chapters, setChapters] = useState([]);

  const getChapter = useCallback(() => {
    setChapter({});
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL + `/chapters?id=${router.query.chapid}`
      )
      .then((res) => {
        if (res.data.status) {
          setChapter(res.data.data);
          if (res.data.data) {
            getChapNum(res.data.data["comic"]);
          }
        }
      })
      .catch((err) => {
        throw err;
      });
  }, [router.query.chapid]);

  const getChapNum = (comicId) => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
          `/chapters?comicId=${comicId}&select=["id","chap_num"]`
      )
      .then((res) => {
        setChapters(res.data.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  const getNext = (currentNum) => {
    if (!chapters) {
      return;
    }
    const chap_nums = [];
    chapters.forEach((chap) => {
      chap_nums.push(chap.chap_num);
    });
    const index = chap_nums.indexOf(currentNum);
    if (chapters[index - 1] !== undefined) {
      return (
        <Link
          href={`/read?chapid=${chapters[index - 1].id}`}
          className="w-10 h-10 flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)] rounded-xl cursor-pointer"
        >
          <i className="fa-light fa-arrow-right"></i>
        </Link>
      );
    }
  };

  const getPrev = (currentNum) => {
    if (!chapters) {
      return;
    }
    const chap_nums = [];
    chapters.forEach((chap) => {
      chap_nums.push(chap.chap_num);
    });
    const index = chap_nums.indexOf(currentNum);
    if (chapters[index + 1] !== undefined) {
      return (
        <Link
          href={`/read?chapid=${chapters[index + 1].id}`}
          className="w-10 h-10 flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)] rounded-xl cursor-pointer"
        >
          <i className="fa-light fa-arrow-left"></i>
        </Link>
      );
    }
  };

  useEffect(() => {
    getChapter();
  }, [getChapter]);

  return (
    <ReaderLayout>
      <div className="sm:mx-0 md:mx-32 lg:mx-64">
        {chapter
          ? chapter.images_list
            ? JSON.parse(chapter.images_list).map((sec, index) => (
                <ImageLoad src={sec} key={index} />
              ))
            : ""
          : ""}
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#101010] p-2 rounded-xl flex gap-2">
        {getPrev(chapter ? chapter.chap_num : 0)}
        {getNext(chapter ? chapter.chap_num : 0)}

        <div className="w-10 h-10 flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)] rounded-xl cursor-pointer text-xs">
          {chapter ? chapter.chap_num : ""}
        </div>
      </div>

      <div className="absolute max-h-[200px] overflow-y-scroll p-2 left-2 top-1/2 -translate-y-1/2 bg-[#101010] rounded-xl flex flex-col">
        {chapters !== null &&
          chapters.map((c, i) => (
            <Link
              href={"/read?chapid=" + c.id}
              className={`w-10 min-h-[40px] flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)] ${
                chapter
                  ? c.chap_num === chapter.chap_num
                    ? "bg-[rgba(255,255,255,0.2)]"
                    : ""
                  : ""
              } rounded-xl cursor-pointer text-xs`}
              key={c.id}
            >
              {c.chap_num}
            </Link>
          ))}
      </div>
    </ReaderLayout>
  );
}
