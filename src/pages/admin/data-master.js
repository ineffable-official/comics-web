import AdminLayout from "@/layouts/admin-layouts";
import axios from "axios";
import { useCallback, useEffect, useReducer, useState } from "react";

export default function DataMaster() {
  const [genres, setGenres] = useState([]);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [token, setToken] = useState();

  const [userData, setUserData] = useState();

  const getData = (token, apiRoute, output) => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + apiRoute, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => output(res.data.data))
      .catch((err) => {
        throw err;
      });
  };

  const dataSubmit = (e, apiRoute) => {
    e.preventDefault();

    const form = new FormData(e.target);
    axios
      .post(process.env.NEXT_PUBLIC_API_URL + apiRoute, form, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  const dataDestroy = (e, apiRoute, dataId) => {
    e.preventDefault();
    axios
      .delete(process.env.NEXT_PUBLIC_API_URL + apiRoute + "?id=" + dataId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload(false);
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
    const getAllData = (token) => {
      getData(token, "/genres", setGenres);
    };

    if (token) {
      getAllData(token);
    }
  }, [token]);

  return (
    <AdminLayout>
      <div className="w-full mt-4">
        <div className="w-full h-auto p-4 border-[1px] rounded-xl bg-gray-50 dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]">
          <div className="text-sm font-medium">Genres</div>
          <div className="flex flex-wrap mt-3 gap-2">
            {genres
              ? genres.map((t) => (
                  <form
                    key={t.id}
                    onSubmit={(e) => dataDestroy(e, "/genres", t.id)}
                  >
                    <div className="pl-2 pr-1 py-1 flex bg-gray-200 rounded-md dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]">
                      <div className="text-xs">{t.name}</div>
                      <button
                        type="submit"
                        className="text-[8px] ml-2 w-4 h-4 hover:bg-gray-300 rounded-md flex items-center justify-center dark:bg-[rgba(255,255,255,0.1)] dark:text-gray-300"
                      >
                        <i className="fa-light fa-x"></i>
                      </button>
                    </div>
                  </form>
                ))
              : ""}
            <form
              className="m-0 p-0"
              onSubmit={(e) => dataSubmit(e, "/genres")}
            >
              <div className="p-1 flex bg-gray-200 rounded-md dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]">
                <input
                  type="text"
                  name="name"
                  className="w-24 text-xs px-2 bg-transparent focus:bg-gray-100 rounded-md outline-none dark:focus:bg-[rgba(255,255,255,0.2)]"
                  placeholder="Name"
                />
                <button
                  type="submit"
                  className="w-4 h-4 rounded-md bg-gray-300 ml-1 text-gray-700 text-[8px] dark:bg-[rgba(255,255,255,0.1)] dark:text-gray-300 "
                >
                  <i className="fa-light fa-send"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
