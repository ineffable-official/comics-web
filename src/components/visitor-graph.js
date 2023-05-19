import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip
);

export default function VisitorGraph({ token }) {
  const [visitData, setVisitData] = useState([]);
  const [visitorRange, setVisitorRange] = useState(7);

  const getVisitData = useCallback(() => {
    if (!token) {
      return;
    }
    var currentDate = new Date();
    var daysAgo = new Date();
    daysAgo.setDate(currentDate.getDate() - visitorRange);

    var start_date = daysAgo.toISOString().split("T")[0];

    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
          `/visit/stats?start_date=${start_date}&end_date=${
            currentDate.toISOString().split("T")[0]
          }`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data.status) {
          setVisitData(res.data.data);
        }
      })
      .catch((err) => {
        throw err;
      });
  }, [token, visitorRange]);

  const formatDate = (date) => {
    var d = new Date(date * 1000);
    return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
  };

  const getVisitLabel = (data) => {
    var new_arr = [];
    data.forEach((x) => new_arr.push(formatDate(x.timestamp)));
    return new_arr;
  };

  const getVisitValue = (data) => {
    var new_arr = [];
    data.forEach((x) => new_arr.push(x.visitor));
    return new_arr;
  };

  useEffect(() => {
    getVisitData();
  }, [getVisitData]);

  return (
    <div className="mt-8 w-full h-auto p-8 bg-[rgb(24,24,24)] rounded-xl">
      <div className="flex mb-4">
        <div className="text-xl font-semibold text-gray-300">
          Numbers of visitor
        </div>
        <div className="ml-auto h-fit flex bg-[rgba(255,255,255,0.1)] p-1 rounded-xl gap-1">
          <div
            className="h-fit px-2 py-1 hover:bg-[rgba(255,255,255,0.1)] cursor-pointer text-gray-400 rounded-lg text-xs"
            onClick={(e) => setVisitorRange(356)}
          >
            Year
          </div>
          <div
            className="h-fit px-2 py-1 hover:bg-[rgba(255,255,255,0.1)] cursor-pointer text-gray-400 rounded-lg text-xs"
            onClick={(e) => setVisitorRange(30)}
          >
            Month
          </div>
          <div
            className="h-fit px-2 py-1 hover:bg-[rgba(255,255,255,0.1)] cursor-pointer text-gray-400 rounded-lg text-xs"
            onClick={(e) => setVisitorRange(7)}
          >
            Week
          </div>
        </div>
      </div>
      <Line
        datasetIdKey="id"
        data={{
          labels: visitData ? getVisitLabel(visitData) : [],
          datasets: [
            {
              label: "Visitor",
              data: visitData ? getVisitValue(visitData) : [],
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.4,
            },
          ],
        }}
        options={{
          scales: {
            x: {
              grid: { display: false },
              beginAtZero: true,
              ticks: { display: false },
            },
            y: {
              grid: { display: false },
              beginAtZero: true,
              ticks: { display: false },
            },
          },
          plugins: {
            tooltip: { enabled: true },
          },
        }}
      />
    </div>
  );
}
