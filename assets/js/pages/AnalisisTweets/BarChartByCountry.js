import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BarChartByCountry = ({
  data: { confirmed, recovered, deaths },
  country,
}) => {
  const options = {
    title: {
      display: true,
      text:
        country != ""
          ? `Situación actual en ${country}`
          : `Situación actual global`,
    },

    chart: {
      type: "column",

      height: 500,
      width: 600,
    },
    subtitle: {
      text: "Segun https://covid19.mathdro.id/",
    },
    xAxis: {
      type: "category",
    },

    series: [
      {
        name: "Numero de personas",
        data: [
          {
            name: "Confirmados",
            y: confirmed.value,
            drilldown: "Confirmados",
            color: "#0055ff",
          },
          {
            name: "Recuperados",
            y: recovered.value,
            drilldown: "Recuperados",
            color: "#00a619",
          },
          {
            name: "Fallecidos",
            y: deaths.value,
            drilldown: "Fallecidos",
            color: "#a60008",
          },
        ],
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default BarChartByCountry;
