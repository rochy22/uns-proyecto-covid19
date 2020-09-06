import React from "react";

const Informacion = ({ initialLat, initialLng, radio }) => (
  <div>
    <h3>Latitud: {initialLng.toFixed(6)}</h3>
    <h3>Longitud: {initialLat.toFixed(6)}</h3>
    <h3>Radio: {radio}</h3>
  </div>
);

export default Informacion;
