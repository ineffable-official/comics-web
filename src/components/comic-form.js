import axios from "axios";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import OptionSelect from "./option-select";
import { useRouter } from "next/router";

export default function ComicForm({ comicId, edit }) {
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState([]);
  const [comic, setComic] = useState({});
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [token, setToken] = useState();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    if (edit) {
      if (!comic.id) {
        return;
      }
      form.set("_method", "PUT");
      form.set("id", comic.id);

      axios
        .post(process.env.NEXT_PUBLIC_API_URL + "/comics", form, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.status) {
            window.location.reload(false);
          }
          alert(res.data.message);
        })
        .catch((err) => {
          throw err;
        });
    } else {
      axios
        .post(process.env.NEXT_PUBLIC_API_URL + "/comics", form, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.status) {
            window.location.reload(false);
          }
          alert(res.data.message);
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  const getGenres = useCallback(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/genres")
      .then((res) => {
        setGenres(res.data.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const getComic = useCallback((cid) => {
    if (!cid) {
      return;
    }
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/comics?id=" + cid)
      .then((res) => {
        setComic(res.data.data);
        setGenre(JSON.parse(res.data.data.genres));
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const genreSelected = (data) => {
    if (genre.includes(data.id)) {
      return true;
    } else {
      return false;
    }
  };

  const selectGenre = (data) => {
    const gnr = genre;
    if (gnr.includes(data.id)) {
      var i = gnr.indexOf(data.id);
      gnr.splice(i);
    } else {
      gnr.push(data.id);
    }
    setGenre(gnr);
    forceUpdate();
  };

  const deleteComic = (comic) => {
    if (!comic) {
      return;
    }
    if (confirm(`Realy to delete ${comic.title}, click Oke to delete`))
      axios
        .delete(process.env.NEXT_PUBLIC_API_URL + "/comics?id=" + comic.id, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.status) {
            router.push("/admin/comics");
          }
          alert(res.data.message);
        })
        .catch((err) => {
          throw err;
        });
  };

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    setToken(token ? token : null);
  }, []);

  useEffect(() => {
    if (edit) {
      getComic(comicId);
    }
    getGenres();
  }, [getGenres, comicId, edit, getComic]);

  return (
    <div className="w-auto h-auto my-2 bg-[rgba(255,255,255,0.1)] rounded-lg p-4 overflow-x-scroll">
      <div className="text-xs text-gray-400">Comic Form</div>
      <form action="" className="mt-2" onSubmit={handleSubmit}>
        <div className="w-full flex gap-2">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            className="w-[128px] h-8 rounded-lg px-2 bg-[rgba(255,255,255,0.1)] text-xs outline-none focus:bg-[rgba(255,255,255,0.2)]"
            defaultValue={edit ? comic.title : ""}
          />
          <input
            type="text"
            name="alt_title"
            id="alt_title"
            placeholder="Alternative Title"
            className="w-[128px] h-8 rounded-lg px-2 bg-[rgba(255,255,255,0.1)] text-xs outline-none focus:bg-[rgba(255,255,255,0.2)]"
            defaultValue={edit ? comic.alt_title : ""}
          />
          <OptionSelect
            id={"author"}
            apiRoute={"/authors"}
            optionName={"author"}
            placeHolder={"Author"}
            defaultValue={edit ? comic.author : ""}
          />
          <OptionSelect
            id={"artist"}
            apiRoute={"/artists"}
            optionName={"artist"}
            placeHolder={"Artist"}
            defaultValue={edit ? comic.artist : ""}
          />

          <OptionSelect
            id={"lang"}
            apiRoute={"/countries"}
            optionName={"lang"}
            placeHolder={"Language"}
            defaultValue={edit ? comic.lang : ""}
          />
          <OptionSelect
            id={"ori-lang"}
            apiRoute={"/countries"}
            optionName={"ori_lang"}
            placeHolder={"Original Language"}
            defaultValue={edit ? comic.ori_lang : ""}
          />
          <OptionSelect
            id={"status"}
            apiRoute={"/statuses"}
            optionName={"status"}
            placeHolder={"Status"}
            defaultValue={edit ? comic.status : ""}
          />
          <div className="flex flex-col">
            <div className="text-gray-300 text-xs mb-2">Genres</div>
            <div className="w-[200px] h-fit flex gap-2 flex-wrap">
              {genres !== null &&
                genres.map((g) => (
                  <div
                    className={`h-fit px-2 py-1 text-xs hover:bg-[rgba(255,255,255,0.2)] rounded-lg cursor-pointer`}
                    style={{
                      backgroundColor: genreSelected(g)
                        ? "rgba(255,255,255,0.25)"
                        : "rgba(255,255,255,0.1)",
                    }}
                    key={g.id}
                    onClick={(e) => {
                      selectGenre(g);
                    }}
                  >
                    {g.name}
                  </div>
                ))}
            </div>
            <input type="hidden" name="genres" value={JSON.stringify(genre)} />
          </div>
          <input
            type="text"
            name="images"
            id="images"
            placeholder="Images"
            className="w-[128px] h-8 rounded-lg px-2 bg-[rgba(255,255,255,0.1)] text-xs outline-none focus:bg-[rgba(255,255,255,0.2)]"
            defaultValue={edit ? comic.images : ""}
          />
          <textarea
            rows={4}
            className="min-w-[256px] rounded-lg p-2 bg-[rgba(255,255,255,0.1)] text-xs outline-none focus:bg-[rgba(255,255,255,0.2)]"
            name="descriptions"
            placeholder="Descriptions"
            defaultValue={edit ? comic.descriptions : ""}
          ></textarea>
          <div className="flex items-center gap-2">
            <button type="submit" className="">
              <div className="w-8 h-8 flex items-center justify-center bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.25)] rounded-xl">
                <i className="fa-light fa-send"></i>
              </div>
            </button>
            <div
              className="w-8 h-8 flex items-center justify-center bg-[rgba(255,255,255,0.1)] hover:bg-red-400 rounded-xl cursor-pointer"
              onClick={(e) => deleteComic(comic)}
            >
              <i className="fa-light fa-trash"></i>
            </div>
            <div className="w-8 h-8 flex items-center justify-center bg-[rgba(255,255,255,0.1)] hover:bg-gray-400 rounded-xl cursor-pointer">
              <i className="fa-light fa-x"></i>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
