import React, { Component } from "react";
import { mygetDisplayMeasurements } from "./MapaPorCoordenadas/Maps.js";

import axios from "axios";
// Css
import "../../css/mapa.css";
// Components
import Buscador from "./MapaPorCoordenadas/Buscador";
import Informacion from "./MapaPorCoordenadas/Informacion";
import Map_world from "./MapaPorCoordenadas/Map_world";
import Tweets from "./MapaPorCoordenadas/Tweets";

class World extends Component {
  constructor() {
    super();
    this.state = {
      tweets: null,
      loading: true,
      drawing: false,
      calcularRadio: true,
      initialLat: -62.27243,
      initialLng: -38.71959,
      finalLat: 0,
      finalLng: 0,
      radius: "0",
      cantidad: 5,
      filtros: ["coronavirus", "covid", "pandemia"],
    };

    this.onClickMap = this.onClickMap.bind(this);
    this.setDrawingFalse = this.setDrawingFalse.bind(this);
  }

  async getTweets() {
    var filt = this.state.filtros.map((n, index) => `storeIds[${index}]=${n}&`);
    axios
      .get("/api/coordenadas", {
        params: {
          latitud: this.state.initialLng,
          longitud: this.state.initialLat,
          radio: this.state.radius,
          cantidad: this.state.cantidad,
          filtros: this.state.filtros.reduce((f, s) => `${f},${s}`),
        },
      })
      .then((tweets) => {
        this.setState({ tweets: tweets.data });
      })
      .catch((error) => {});
  }

  /* componentDidUpdate() {
    if (
      this.state.radius !== 0 &&
      this.state.tweets == null &&
      !this.state.drawing
    ) {
      this.setState({ drawing: !this.state.drawing });
      this.getTweets();
      this.setState({ drawing: !this.state.drawing });
    }
  }*/

  onClickMap(maps, evt) {
    if (!this.state.drawing) {
      this.state.initialLat = evt.lngLat.lng;
      this.state.initialLng = evt.lngLat.lat;
      this.setState({
        ...this.state,
        drawing: true,
      });
    } else {
      if (this.state.calcularRadio) {
        this.state.finalLat = evt.lngLat.lat;
        this.state.finalLng = evt.lngLat.lng;
        this.setState({
          radius: mygetDisplayMeasurements(
            this.state.initialLng,
            this.state.initialLat,
            this.state.finalLat,
            this.state.finalLng
          ),
          calcularRadio: false,
        });
        this.getTweets();
      }
    }
  }

  setDrawingFalse() {
    this.setState({
      drawing: false,
      calcularRadio: true,
      radius: 0,
      tweets: null,
    });
  }

  filtros_agregar = (filtrosNuevos) => {
    let filtros = this.state.filtros;
    filtrosNuevos.forEach((filtro) => {
      if (!filtros.includes(filtro)) {
        filtros.push(filtro);
      }
    });
    this.setState({
      ...this.state,
      filtros,
    });
  };

  filtros_eliminar = (filtro) => {
    let filtros = this.state.filtros.filter((item) => item != filtro);
    this.setState({
      ...this.state,
      filtros,
    });
  };

  setCantidad_tweets = (cantidad) => {
    this.setState({
      ...this.state,
      cantidad,
    });
  };

  render() {
    return (
      <div id="cuerpo">
        <div id="map_info">
          <Map_world
            initialLat={this.state.initialLat}
            initialLng={this.state.initialLng}
            onClickMap={this.onClickMap}
            setDrawingFalse={this.setDrawingFalse}
          />

          <div id="secundario">
            <Informacion
              initialLat={this.state.initialLat}
              initialLng={this.state.initialLng}
              radio={this.state.radius}
            />
            <Buscador
              filtros={this.state.filtros}
              filtros_agregar={this.filtros_agregar}
              filtros_eliminar={this.filtros_eliminar}
              cantidad_tweets={this.setCantidad_tweets}
            />
          </div>
        </div>

        <Tweets tweets={this.state.tweets} />
      </div>
    );
  }
}
export default World;
