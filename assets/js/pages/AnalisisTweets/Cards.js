import React from "react";
import CountUp from "react-countup";

const Info = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) {
    return "Loading...";
  }

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title death">Muertes</h4>
          <h6 className="card-subtitle  mb-2 text-muted">
            {" "}
            <CountUp
              start={0}
              end={deaths.value}
              duration={2.75}
              separator=","
            />
          </h6>
          <p className="card-text"> {new Date(lastUpdate).toDateString()}</p>
          <p className="card-text">Número de fallecidos por COVID-19. </p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title recovered">Personas recuperadas</h4>
          <h6 className="card-subtitle mb-2 text-muted">
            {" "}
            <CountUp
              start={0}
              end={recovered.value}
              duration={2.75}
              separator=","
            />
          </h6>
          <p className="card-text"> {new Date(lastUpdate).toDateString()}</p>
          <p className="card-text"> Número de recuperaciones de COVID-19.</p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title confirmed">Confirmados</h4>
          <h6 className="card-subtitle mb-2 text-muted">
            {" "}
            <CountUp
              start={0}
              end={confirmed.value}
              duration={2.75}
              separator=","
            />
          </h6>
          <p className="card-text"> {new Date(lastUpdate).toDateString()}</p>
          <p className="card-text"> Número de casos activos de COVID-19.</p>
        </div>
      </div>
    </div>
  );
};
export default Info;
