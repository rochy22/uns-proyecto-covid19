import React from "react";
import { getWorld } from "../api/mapData";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { fetchDailyData, fetchCountriesPlusIso, fetchData } from "../api";

require("highcharts/modules/map")(Highcharts);

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapData: null,
      dailyData: null,
    };
    this.dailyData = fetchDailyData();
    this.options = {
      title: {
        text: "Porcentaje de muertes con respecto a casos confirmados",
      },
      subtitle: {
        text: "Fuente https://covid19.mathdro.id/",
      },
      chart: {
        type: "map",
        map: null,
        height: 650,
        width: 950,
      },
      mapNavigation: {
        enabled: true,
        enableButtons: false,
      },
      credits: {
        enabled: false,
      },
      colorAxis: {
        min: 0.02,
        max: 20,
        minColor: "#ffdad1",
        maxColor: "#b50202",
      },

      tooltip: {
        pointFormatter: function () {
          return this.name + ": " + this.value + "%";
        },
      },
      legend: {
        layout: "horizontal",
        borderWidth: 0,
        backgroundColor: "rgba(255,255,255,0.85)",
        floating: true,
        verticalAlign: "top",
        y: 25,
      },
      series: [
        {
          name: "Pais",
          dataLabels: {
            enabled: true,
            color: "#FFFFFF",
            format: "{point.postal-code}",
            style: {
              textTransform: "uppercase",
            },
          },
          tooltip: {
            ySuffix: " %",
          },
          cursor: "pointer",
          joinBy: ["iso-a2", "code"],
          data: [],
        },
      ],
    };
  }

  componentDidMount() {
    getWorld().then((r) => {
      this.setState({ mapData: r.data }, async () => {
        this.options.series[0].data = [];
        this.options["chart"]["map"] = this.state.mapData;
        let contries = await fetchCountriesPlusIso();

        for (let i in this.state.mapData["features"]) {
          let mapInfo = this.state.mapData["features"][i];

          if (mapInfo["id"]) {
            var postalCode = mapInfo["id"];

            var name = mapInfo["properties"]["name"];
            var value = await this.getValue(postalCode, contries);
            var type = value;
            var row = i;

            console.log(
              "{name:" + name + ",code:" + postalCode + ",value:" + value + "}"
            );
            this.options.series[0].data.push({
              name: name,
              code: postalCode,
              value: value,
            });
          }
          this.options.series[0].joinBy = ["iso-a2", "code"];
        }
        this.setState({ mapOptions: this.options });
      });
    });
  }

  async getValue(value, contries) {
    var hayData = false;
    contries.map((i) => {
      if (i.iso == value) {
        hayData = true;
      }
    });
    if (value == "GM" || value == "CZ" || !hayData) {
      return 0.02;
    }

    var { confirmed, deaths } = await fetchData(value);

    if (confirmed.value == 0 || deaths.value == 0) {
      return 0.02;
    }
    var promedio = (deaths.value * 100) / confirmed.value;
    return promedio.toFixed(3);
  }

  render() {
    return (
      <div>
        {this.state.mapData ? (
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={"mapChart"}
            options={this.state.mapOptions}
          />
        ) : (
          "Cargando mapa, por favor espere"
        )}
      </div>
    );
  }
}

export default Map;
