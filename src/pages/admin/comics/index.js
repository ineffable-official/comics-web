import AdminCard from "@/components/admin-card";
import ComicForm from "@/components/comic-form";
import AdminLayout from "@/layouts/admin-layout";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function Comics() {
  const [comics, setComics] = useState([]);

  const getComics = useCallback(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/comics")
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
      <ComicForm comic={1}/>
      <div className="mt-8 grid grid-cols-4 gap-4">
        {comics !== null &&
          comics.map((c) => <AdminCard data={c} key={c.id} />)}
      </div>
    </AdminLayout>
  );
}
