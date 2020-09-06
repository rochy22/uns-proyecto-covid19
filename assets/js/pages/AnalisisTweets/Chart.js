import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { fetchDailyData } from "../api";

const Chart = () => {
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
      text: "Informacion global de casos por COVID-19",
    },
    chart: {
      height: 500,
      width: 900,
    },

    subtitle: {
      text: "Fuente https://covid19.mathdro.id/",
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

    colors: ["#3a00ff", "#ff0000"],

    series: [
      {
        name: "Confirmados",

        data: dailyData[0]
          ? dailyData.map((data) => [
              Date.UTC(
                data.date.split("-")[0],
                data.date.split("-")[1],
                data.date.split("-")[2]
              ),
              data.confirmed,
            ])
          : null,
        fillOpacity: 0.5,
      },
      {
        name: "Muertes",
        data: dailyData[0]
          ? dailyData.map((data) => [
              Date.UTC(
                data.date.split("-")[0],
                data.date.split("-")[1],
                data.date.split("-")[2]
              ),
              data.deaths,
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

export default Chart;
