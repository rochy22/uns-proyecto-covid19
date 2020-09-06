import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { fetchDailyData } from "../api";

const SentimentAnalysis = ({ data: tweets }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };
    fetchMyAPI();
  }, []);

  const options = {
    title: {
      text: "Analisis del contenido de tweets relacionados con covid-19",
    },
    chart: {
      type: "area",
      height: 500,
      width: 900,
    },

    subtitle: {
      text: "Fuente https://twitter.com",
    },
    xAxis: {
      type: "datetime",
      labels: {
        formatter: function () {
          return Highcharts.dateFormat("%d %b %Y", this.value);
        },
      },
    },

    yAxis: [
      {
        title: {
          text: null,
        },
        labels: {
          align: "left",
          x: 3,
          y: 16,
          format: "{value:.,0f}",
        },
        showFirstLabel: false,
      },
      {
        title: {
          text: "Cantidad de personas en el mundo",
        },
        labels: {
          align: "right",
          x: -13,
          y: 16,
          format: "{value:.,0f}",
        },
        showFirstLabel: false,
      },
    ],

    colors: ["#9e9ca6", "#a30000", "#00c724"],

    series: [
      {
        name: "Tweets neutrales",

        data: dailyData[0]
          ? tweets.map((data) => [
              Date.UTC(
                data.day.split("T")[0].split("-")[0],
                data.day.split("T")[0].split("-")[1],
                data.day.split("T")[0].split("-")[2]
              ),
              data.neutral,
            ])
          : null,
        fillOpacity: 0.5,
      },
      {
        name: "Tweets negativos",
        data: dailyData[0]
          ? tweets.map((data) => [
              Date.UTC(
                data.day.split("T")[0].split("-")[0],
                data.day.split("T")[0].split("-")[1],
                data.day.split("T")[0].split("-")[2]
              ),
              data.sad,
            ])
          : null,
      },
      {
        name: "Tweets positivos",
        data: dailyData[0]
          ? tweets.map((data) => [
              Date.UTC(
                data.day.split("T")[0].split("-")[0],
                data.day.split("T")[0].split("-")[1],
                data.day.split("T")[0].split("-")[2]
              ),
              data.good,
            ])
          : null,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default SentimentAnalysis;
