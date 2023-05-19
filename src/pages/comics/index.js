import Card from "@/components/card";
import MainLayout from "@/layouts/main-layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useCallback, useEffect } from "react";

export default function ComicsPage() {
  const [comics, setComics] = useState([]);
  const router = useRouter();

  const getComics = useCallback(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
          `/comics?orderBy=updated_at&take=5${
            router.query.search ? `&search=${router.query.search}` : ""
          }`
      )
      .then((res) => {
        setComics(res.data.data);
      })
      .catch((err) => {
        throw err;
      });
  }, [router.query.search]);

  useEffect(() => {
    getComics();
  }, [getComics]);

  return (
    <MainLayout>
      <div className="mt-8 flex flex-wrap gap-4">
        {comics.length > 0 ? (
          comics.map((d, i) => <Card data={d} key={i} />)
        ) : (
          <div className="w-full h-screen flex items-center justify-center text-4xl font-semibold">
            Not found
          </div>
        )}
      </div>
    </MainLayout>
  );
}
