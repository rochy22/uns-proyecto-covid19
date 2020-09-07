import React, { Component } from "react";
import axios from "axios";
// Css
import "../../css/labelCountTweets.css";

class RequestTweets extends Component {
  constructor() {
    super();
    this.state = {
      request: null,
    };
  }

  componentDidMount() {
    this.getRestantes();
  }

  getRestantes() {
    axios.get(`/api/count`).then((response) => {
      this.setState({ request: Object.values(response.data.search)[0] });
    });
  }

  render() {
    return (
      <div className="panelAlerta">
        {this.state.request?.remaining < this.state.request?.limit / 3 ? (
          <div className="panel panel-danger">
            <div className="panel-heading">ALERTA</div>
            <div className="panel-body">
              Se ha alcanzado el limite de peticiones permitido dentro de un
              intervalo de 15 minutos. Para continuar navegando por favor espere
              15 minutos. Esto evitira que la aplicacion sea incluida en la
              lista negra. Las aplicaciones en la lista negra no pueden obtener
              una respuesta de la API de Twitter. Hora de reseteo:
              {() => this.state.request?.reset}
            </div>
          </div>
        ) : (
          <span id="demoFont">
            Consultas disponibles: {this.state.request?.remaining} /
            {this.state.request?.limit}
          </span>
        )}
      </div>
    );
  }
}

export default RequestTweets;
