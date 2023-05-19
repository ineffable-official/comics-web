import Card from "@/components/card";
import CardSlider from "@/components/card-slider";
import MainLayout from "@/layouts/main-layout";
import axios from "axios";
import moment from "moment";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [latest, setLatest] = useState([]);
  const [trendings, setTrendings] = useState([]);
  const [randoms, setRandoms] = useState([]);

  const getTrending = useCallback(() => {
    var currentDate = new Date();
    var daysAgo = new Date();
    daysAgo.setDate(currentDate.getDate() - 30);

    var start_date = daysAgo.toISOString().split("T")[0];

    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
          `/comics/trendings?start_date=${start_date}&end_date=${currentDate}&take=10`
      )
      .then((res) => {
        setTrendings(res.data.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const getRandoms = useCallback(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + `/comics?random=true&take=10`)
      .then((res) => {
        setRandoms(res.data.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const getLatest = useCallback(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL + "/comics?orderBy=updated_at&take=5"
      )
      .then((res) => {
        setLatest(res.data.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  useEffect(() => {
    getTrending();
    getLatest();
    getRandoms();
  }, [getTrending, getLatest, getRandoms]);

  return (
    <MainLayout>
      <>
        <Head>
          <title>Nimetoon - Best comics center</title>
        </Head>
      </>
      {latest.length > 0 ? <CardSlider data={latest} /> : ""}
      <div className="w-full h-auto my-8">
        <div className="text-xs text-gray-400">Trendings</div>
        <div className="w-full h-auto flex gap-4 overflow-x-scroll">
          {trendings.map((d, i) => (
            <Card data={d} key={i} />
          ))}
        </div>
      </div>
      <div className="w-full h-auto my-8">
        <div className="text-xs text-gray-400">Randoms</div>
        <div className="w-full h-auto flex gap-4 overflow-x-scroll">
          {randoms.map((d, i) => (
            <Card data={d} key={i} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
