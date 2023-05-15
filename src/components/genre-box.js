import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function GenreBox({ id }) {
  const [genre, setGenre] = useState([]);

  const [loading, setLoading] = useState(true);

  const getGenre = useCallback(() => {
    setLoading(false);
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/genres?id=" + id)
      .then((res) => {
        const t = setTimeout(() => {
          if (res.data.status) {
            setGenre(res.data.data);
          }
          setLoading(false);
        }, 1000);
        return () => {
          clearTimeout(t);
        };
      })
      .catch((err) => {
        throw err;
      });
  }, [id]);

  useEffect(() => {
    getGenre();
  }, [getGenre]);

  return (
    <div className="w-auto py-1 px-2 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] transition-all duration-100 ease-in-out cursor-pointer rounded-lg text-gray-300">
      {loading ? (
        <div className="w-6 h-6 flex items-center justify-center animate-spin">
          <i className="fa-light fa-spinner"></i>
        </div>
      ) : genre !== null ? (
        genre.name
      ) : (
        ""
      )}
    </div>
  );
}
