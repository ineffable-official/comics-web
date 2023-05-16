import ImageLoad from "@/components/image-load";
import ReaderLayout from "@/layouts/reader-layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function ReadPage() {
  const router = useRouter();
  const [chapter, setChapter] = useState();

  const getChapter = useCallback(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL + `/chapters?id=${router.query.chapid}`
      )
      .then((res) => {
        setChapter(res.data.data);
      })
      .catch((err) => {
        throw err;
      });
  }, [router.query.chapid]);

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
    </ReaderLayout>
  );
}
