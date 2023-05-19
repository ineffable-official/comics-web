import ImageLoad from "@/components/image-load";
import ReaderLayout from "@/layouts/reader-layout";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useCallback, useEffect, useRef } from "react";

export default function ReadPage() {
  const router = useRouter();
  const [chapter, setChapter] = useState({});
  const [chapters, setChapters] = useState([]);
  const [comic, setComic] = useState({});
  const scrollableDivRef = useRef(null);
  const [token, setToken] = useState();
  const [user, setUser] = useState(null);
  const [newVisit, setNewVisit] = useState(false);
  const [userLoad, setUserLoad] = useState(false);

  const getUser = useCallback((tkn) => {
    if (!tkn) {
      setUserLoad(true);
      return;
    }

    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/account", {
        headers: { Authorization: `Bearer ${tkn}` },
      })
      .then((res) => {
        setUserLoad(true);
        if (res.data.status) {
          setUser(res.data.data);
        }
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token ? token : null);
  }, []);

  const getChapNum = useCallback((comicId) => {
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
  }, []);

  const newVisitor = useCallback((comicId, userId) => {
    if (!comicId) {
      return;
    }

    axios
      .post(
        process.env.NEXT_PUBLIC_API_URL +
          `/visit?comic=${comicId}${userId ? `&user=${userId}` : ""}`
      )
      .then((res) => {
        setNewVisit(true);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const getComicInfo = useCallback((comicId) => {
    if (!comicId) {
      return;
    }

    axios
      .get(process.env.NEXT_PUBLIC_API_URL + `/comics?id=${comicId}`)
      .then((res) => {
        setComic(res.data.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const getChapter = useCallback(
    (chapid) => {
      if (!chapid) {
        return;
      }
      setChapter({});
      axios
        .get(process.env.NEXT_PUBLIC_API_URL + `/chapters?id=${chapid}`)
        .then((res) => {
          if (res.data.status) {
            if (res.data.data === null) {
              router.push("/404");
              return;
            }
            setChapter(res.data.data);
            getChapNum(res.data.data.comic);
            getComicInfo(res.data.data.comic);
            if (userLoad) {
              if (user) {
                newVisitor(res.data.data.comic, user.id);
              } else {
                newVisitor(res.data.data.comic);
              }
            }
          }
        })
        .catch((err) => {
          throw err;
        });
    },
    [router, getChapNum, getComicInfo, userLoad, newVisitor, user]
  );

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
          href={`/comics/read?chapid=${chapters[index - 1].id}`}
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
          href={`/comics/read?chapid=${chapters[index + 1].id}`}
          className="w-10 h-10 flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)] rounded-xl cursor-pointer"
        >
          <i className="fa-light fa-arrow-left"></i>
        </Link>
      );
    }
  };

  useEffect(() => {
    getUser(token);
  }, [getUser, token]);

  useEffect(() => {
    if (userLoad) {
      getChapter(router.query.chapid);
    }
  }, [getChapter, router.query.chapid, userLoad]);

  useEffect(() => {
    const handleKeyDown = (event) => {};
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <ReaderLayout>
      <>
        <Head>
          {comic ? (
            <title>
              Baca {comic.title} Chapter {chapter.chap_num} - Nimetoon
            </title>
          ) : (
            ""
          )}
        </Head>
      </>
      <div className="sm:mx-0 md:mx-32 lg:mx-64" ref={scrollableDivRef}>
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

      <div className="absolute max-h-[200px] overflow-y-scroll p-2 left-2 top-1/2 -translate-y-1/2 bg-[#101010] rounded-xl flex flex-col gap-1">
        {chapters !== null &&
          chapters.map((c, i) => (
            <Link
              href={"/comics/read?chapid=" + c.id}
              className={`w-10 min-h-[40px] flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)] ${
                chapter
                  ? c.chap_num === chapter.chap_num
                    ? "bg-[rgba(255,255,255,0.2)]"
                    : ""
                  : ""
              } rounded-lg cursor-pointer text-xs`}
              key={c.id}
            >
              {c.chap_num}
            </Link>
          ))}
      </div>
    </ReaderLayout>
  );
}
