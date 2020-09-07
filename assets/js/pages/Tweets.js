import React, { Component } from "react";
import axios from "axios";
import "../../css/tweets.css";
import {
  analisisTexto,
  updateDay,
  contadorHashtags,
} from "./AnalisisTweets/TweetHelper";
import Info from "./AnalisisTweets/Cards.js";
import Chart from "./AnalisisTweets/Chart";
import Map from "./AnalisisTweets/Map";
import SentimentAnalysis from "./AnalisisTweets/AreaChartSentimentAnalysis";
import SelectorCountries from "./AnalisisTweets/CountryPicker";
import BarChartByCountry from "./AnalisisTweets/BarChartByCountry";
import PieChartHashtag from "./AnalisisTweets/PieChartHashtag";
import Comparador from "./AnalisisTweets/ComparadorCantTweets";

import { fetchData } from "./api";

class Tweets extends Component {
  state = {
    tweets: [],
    hashtags: [],
    loading: true,
    disabled: false,
    data: {},
    country: "",
  };

  async componentDidMount() {
    const data = await fetchData();
    this.setState({ data });

    this.updateTweets();
    this.getTweets();
    this.getHashtags();
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);
    this.setState({ data, country: country });
  };

  async getTweets() {
    axios.get(`/api/tweets`).then((tweets) => {
      this.setState({ tweets: tweets.data, loading: false });
    });
  }

  async getHashtags() {
    axios.get(`/api/hashtag`).then((hashtags) => {
      this.setState({ hashtags: hashtags.data });
    });
  }

  async updateTweets() {
    let newDate = new Date();
    let diaActualidad = newDate.getDate();
    let mesActualidad = newDate.getMonth() + 1;
    let añoActualidad = newDate.getFullYear();
    let analisis = [0, 0, 0];
    let mapActual = new Map();

    axios
      .get(`/api/isUpdate`, {
        params: {
          day: añoActualidad + "-" + mesActualidad + "-" + diaActualidad,
        },
      })
      .then((resultado) => {
        var diaGuardado, mesGuardado, añoGuardado;
        if (resultado.data == null) {
          diaGuardado = diaActualidad > 7 ? diaActualidad - 6 : 1;
          mesGuardado = mesActualidad;
          añoGuardado = añoActualidad;
        } else {
          diaGuardado = parseInt(resultado.data.day.split("-")[2]);
          mesGuardado = parseInt(resultado.data.day.split("-")[1]);
          añoGuardado = parseInt(resultado.data.day.split("-")[0]);
        }

        if (
          (diaGuardado < diaActualidad && mesGuardado == mesActualidad) ||
          mesGuardado < mesActualidad
        ) {
          let token = [diaGuardado, mesGuardado, añoGuardado];
          var arregloRetornado = updateDay(token[0], token[1], token[2]);
          token[0] = arregloRetornado[0];
          token[1] = arregloRetornado[1];
          token[2] = arregloRetornado[2];

          axios
            .get(`/api/getTweetsPerDay`, {
              params: {
                day: token[2] + "-" + token[1] + "-" + token[0],
              },
            })
            .then((tweets) => {
              tweets.data.map((infoTweets) => {
                var resultado = analisisTexto(JSON.parse(infoTweets).statuses);
                analisis[0] = analisis[0] + resultado[0];
                analisis[1] = analisis[1] + resultado[1];
                analisis[2] = analisis[2] + resultado[2];
                mapActual = contadorHashtags(
                  JSON.parse(infoTweets).statuses,
                  mapActual
                );
              });

              axios
                .get("/api/update", {
                  params: {
                    day: new Date(token[2], token[1] - 1, token[0]),
                    sad: analisis[0],
                    neutral: analisis[1],
                    good: analisis[2],
                  },
                })
                .then((tweets) => {
                  this.setState({ tweets: tweets.data, loading: false });
                  for (let [key, value] of mapActual) {
                    if (value > 1) {
                      axios.get("/api/updateHashtags", {
                        params: {
                          texto: key,
                          cantidad: value,
                        },
                      });
                    }
                  }
                })
                .catch((error) => {
                  console.log("Error", error);
                });
            })
            .catch((error) => {
              console.log("Error", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  render() {
    const { loading } = this.state;
    const canRequest = this.state.request != null;
    const { data, country, tweets, hashtags } = this.state;
    return (
      <div>
        <section className="row-section">
          <div className="main">
            <div>
              <h2 className="text-center">
                <span>Analisis de tweets</span>
              </h2>
            </div>

            {loading ? (
              <div className={"panel text-center"}>
                <span className="fa fa-spin fa-spinner fa-4x"></span>
              </div>
            ) : (
              <div className="panel">
                <Info data={data} />
                <Chart />
                <div className="bloques">
                  <div className="panel">
                    <SelectorCountries
                      handleCountryChange={this.handleCountryChange}
                    />
                    <BarChartByCountry data={data} country={country} />
                  </div>
                  <PieChartHashtag className="PiePanel" data={hashtags} />
                </div>
                <div className="bloqueContadorTweets">
                  <SentimentAnalysis data={tweets} />
                  <Comparador data={tweets} />
                </div>

                <Map />
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
}
export default Tweets;
