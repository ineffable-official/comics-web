import axios from "axios";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";

export default function ComicForm({ comic }) {
  const authorInputRef = useRef(null);
  const authorSelectedRef = useRef(null);
  const artistInputRef = useRef(null);
  const artistSelectedRef = useRef(null);
  const langInputRef = useRef(null);
  const langSelectedRef = useRef(null);
  const oriLangInputRef = useRef(null);
  const oriLangSelectedRef = useRef(null);
  const statusInputRef = useRef(null);
  const statusSelectedRef = useRef(null);
  const [authors, setAuthors] = useState([]);
  const [artists, setArtists] = useState([]);
  const [lang, setLang] = useState([]);
  const [oriLang, setOriLang] = useState([]);
  const [status, setStatus] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState([]);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [token, setToken] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

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
  };

  const searchData = (e, apiRoute, result) => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL + `${apiRoute}?search=${e.target.value}`
      )
      .then((res) => {
        result(res.data.data);
      })
      .catch((err) => {
        throw err;
      });
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

  const selectOption = (input, data, result) => {
    input.current.value = data.name;
    result.current.value = data.id;
  };

  const genreSelected = (data) => {
    if (genre.includes(data.id)) {
      return true;
    } else {
      return false;
    }
  };

  const selectGenre = (data) => {
    const gnr = genre;
    genres.forEach((g) => {
      if (gnr.includes(data.id)) {
        var i = gnr.indexOf(data.id);
        gnr.splice(i)
      } else {
        gnr.push(data.id);
      }
    });
    setGenre(gnr);
    forceUpdate();
  };

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    setToken(token ? token : null);
  }, []);

  useEffect(() => {
    getGenres();
  }, [getGenres]);

  return (
    <div className="w-full my-2 bg-[rgba(255,255,255,0.1)] rounded-lg p-4 overflow-x-scroll">
      <div className="text-xs text-gray-400">Add Chapter</div>
      <form action="" className="mt-2" onSubmit={handleSubmit}>
        <div className="w-full flex gap-2">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            className="w-[128px] h-8 rounded-lg px-2 bg-[rgba(255,255,255,0.1)] text-xs outline-none focus:bg-[rgba(255,255,255,0.2)]"
          />
          <input
            type="text"
            name="alt_title"
            id="alt_title"
            placeholder="Alternative Title"
            className="w-[128px] h-8 rounded-lg px-2 bg-[rgba(255,255,255,0.1)] text-xs outline-none focus:bg-[rgba(255,255,255,0.2)]"
          />
          <div className="relative">
            <input
              type="text"
              id="author"
              placeholder="Author"
              className="w-[128px] h-8 rounded-lg px-2 bg-[rgba(255,255,255,0.1)] text-xs outline-none focus:bg-[rgba(255,255,255,0.2)]"
              onChange={(e) => {
                searchData(e, "/authors", setAuthors);
              }}
              ref={authorInputRef}
            />
            {authors !== null ? (
              <div className="absolute w-full h-auto p-2 bg-[rgba(255,255,255,0.1)] top-10 rounded-lg">
                {authors.map((a) => (
                  <div
                    className="w-full h-auto py-2 flex items-center justify-center text-xs hover:bg-[rgba(255,255,255,0.1)] rounded-lg"
                    key={a.id}
                    onClick={(e) => {
                      selectOption(authorInputRef, a, authorSelectedRef);
                    }}
                  >
                    {a.name}
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
            <input
              type="hidden"
              name="author"
              ref={authorSelectedRef}
              onChange={(e) => {}}
            />
          </div>
          <div className="relative">
            <input
              type="text"
              id="artist"
              placeholder="Artist"
              className="w-[128px] h-8 rounded-lg px-2 bg-[rgba(255,255,255,0.1)] text-xs outline-none focus:bg-[rgba(255,255,255,0.2)]"
              onChange={(e) => {
                searchData(e, "/artists", setArtists);
              }}
              ref={artistInputRef}
            />
            {artists !== null ? (
              <div className="absolute w-full h-auto p-2 bg-[rgba(255,255,255,0.1)] top-10 rounded-lg">
                {artists.map((a) => (
                  <div
                    className="w-full h-auto py-2 flex items-center justify-center text-xs hover:bg-[rgba(255,255,255,0.1)] rounded-lg"
                    key={a.id}
                    onClick={(e) => {
                      selectOption(artistInputRef, a, artistSelectedRef);
                    }}
                  >
                    {a.name}
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
            <input
              type="hidden"
              name="artist"
              ref={artistSelectedRef}
              onChange={(e) => {}}
            />
          </div>
          <div className="relative">
            <input
              type="text"
              id="lang"
              placeholder="Language"
              className="w-[128px] h-8 rounded-lg px-2 bg-[rgba(255,255,255,0.1)] text-xs outline-none focus:bg-[rgba(255,255,255,0.2)]"
              onChange={(e) => {
                searchData(e, "/countries", setLang);
              }}
              ref={langInputRef}
            />
            {lang !== null ? (
              <div className="absolute w-full h-auto p-2 bg-[rgba(255,255,255,0.1)] top-10 rounded-lg">
                {lang.map((a) => (
                  <div
                    className="w-full h-auto py-2 flex items-center justify-center text-xs hover:bg-[rgba(255,255,255,0.1)] rounded-lg"
                    key={a.id}
                    onClick={(e) => {
                      selectOption(langInputRef, a, langSelectedRef);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full overflow-hidden">
                        <picture>
                          <img src={a.images} alt="" />
                        </picture>
                      </div>
                      <div className="text-xs">{a.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
            <input
              type="hidden"
              name="lang"
              ref={langSelectedRef}
              onChange={(e) => {}}
            />
          </div>
          <div className="relative">
            <input
              type="text"
              id="ori-lang"
              placeholder="Original Language"
              className="w-[128px] h-8 rounded-lg px-2 bg-[rgba(255,255,255,0.1)] text-xs outline-none focus:bg-[rgba(255,255,255,0.2)]"
              onChange={(e) => {
                searchData(e, "/countries", setOriLang);
              }}
              ref={oriLangInputRef}
            />
            {oriLang !== null ? (
              <div className="absolute w-full h-auto p-2 bg-[rgba(255,255,255,0.1)] top-10 rounded-lg">
                {oriLang.map((a) => (
                  <div
                    className="w-full h-auto py-2 flex items-center justify-center text-xs hover:bg-[rgba(255,255,255,0.1)] rounded-lg"
                    key={a.id}
                    onClick={(e) => {
                      selectOption(oriLangInputRef, a, oriLangSelectedRef);
                    }}
                  >
                    {a.name}
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
            <input
              type="hidden"
              name="ori_lang"
              ref={oriLangSelectedRef}
              onChange={(e) => {}}
            />
          </div>
          <div className="relative">
            <input
              type="text"
              id="status"
              placeholder="Status"
              className="w-[128px] h-8 rounded-lg px-2 bg-[rgba(255,255,255,0.1)] text-xs outline-none focus:bg-[rgba(255,255,255,0.2)]"
              onChange={(e) => {
                searchData(e, "/statuses", setStatus);
              }}
              ref={statusInputRef}
            />
            {status !== null ? (
              <div className="absolute w-full h-auto p-2 bg-[rgba(255,255,255,0.1)] top-10 rounded-lg">
                {status.map((a) => (
                  <div
                    className="w-full h-auto py-2 flex items-center justify-center text-xs hover:bg-[rgba(255,255,255,0.1)] rounded-lg"
                    key={a.id}
                    onClick={(e) => {
                      selectOption(statusInputRef, a, statusSelectedRef);
                    }}
                  >
                    {a.name}
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
            <input
              type="hidden"
              name="status"
              ref={statusSelectedRef}
              onChange={(e) => {}}
            />
          </div>
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
          />
          <textarea
            rows={4}
            className="min-w-[256px] rounded-lg p-2 bg-[rgba(255,255,255,0.1)] text-xs outline-none focus:bg-[rgba(255,255,255,0.2)]"
            name="descriptions"
            placeholder="Descriptions"
          ></textarea>
          <button type="submit" className="">
            <div className="w-8 h-8 flex items-center justify-center bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.25)] rounded-xl">
              <i className="fa-light fa-send"></i>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}
