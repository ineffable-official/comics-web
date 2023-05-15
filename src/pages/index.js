import Card from "@/components/card";
import CardSlider from "@/components/card-slider";
import MainLayout from "@/layouts/main-layout";
import axios from "axios";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [trendings, setTrendings] = useState([]);

  const getTrending = useCallback(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/comics")
      .then((res) => {
        setTrendings(res.data.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  useEffect(() => {
    getTrending();
  }, [getTrending]);

  return (
    <MainLayout>
      <CardSlider />

      <div className="w-full h-auto my-8">
        <div className="text-xs text-gray-400">Trendings</div>
        <div className="w-full h-auto flex gap-4 overflow-x-scroll">
          {trendings.map((d, i) => (
            <Card data={d} key={i} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
