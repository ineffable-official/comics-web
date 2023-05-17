import DataMasterSection from "@/components/data-master-section";
import AdminLayout from "@/layouts/admin-layout";
import axios from "axios";
import { useCallback, useEffect, useReducer, useState } from "react";

export default function DataMaster() {
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [artists, setArtists] = useState([]);
  const [countries, setCountries] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [token, setToken] = useState();
  
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
      getData(token, "/authors", setAuthors);
      getData(token, "/artists", setArtists);
      getData(token, "/countries", setCountries);
      getData(token, "/statuses", setStatuses);
    };

    if (token) {
      getAllData(token);
    }
  }, [token]);

  return (
    <AdminLayout>
      <div className="w-full mt-4">
        <DataMasterSection
          title={"Genres"}
          apiRoute={"/genres"}
          dataDestroy={dataDestroy}
          dataSubmit={dataSubmit}
          lists={genres}
        />
        <DataMasterSection
          title={"Authors"}
          apiRoute={"/authors"}
          dataDestroy={dataDestroy}
          dataSubmit={dataSubmit}
          lists={authors}
        />
        <DataMasterSection
          title={"Artists"}
          apiRoute={"/artists"}
          dataDestroy={dataDestroy}
          dataSubmit={dataSubmit}
          lists={artists}
        />
        <DataMasterSection
          title={"Statuses"}
          apiRoute={"/statuses"}
          dataDestroy={dataDestroy}
          dataSubmit={dataSubmit}
          lists={statuses}
        />
        <DataMasterSection
          title={"Countries"}
          apiRoute={"/countries"}
          dataDestroy={dataDestroy}
          dataSubmit={dataSubmit}
          lists={countries}
        />
      </div>
    </AdminLayout>
  );
}
