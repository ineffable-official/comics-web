import AdminCard from "@/components/admin-card";
import ComicForm from "@/components/comic-form";
import AdminLayout from "@/layouts/admin-layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function Comics() {
  const [comics, setComics] = useState([]);
  const router = useRouter();

  const getComics = useCallback(() => {
    setComics([]);
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/comics?orderBy=updated_at&orderDirection=desc")
      .then((res) => {
        setComics(res.data.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  useEffect(() => {
    getComics();
  }, [getComics]);

  return (
    <AdminLayout>
      <div className="text-xl">Comics</div>
      {router.query.edit && router.query.comicId !== null ? (
        <ComicForm comicId={router.query.comicId} edit={router.query.edit} />
      ) : (
        <ComicForm />
      )}
      <div className="mt-8 grid grid-cols-3 gap-4">
        {comics !== null &&
          comics.map((c) => <AdminCard data={c} key={c.id} />)}
      </div>
    </AdminLayout>
  );
}
