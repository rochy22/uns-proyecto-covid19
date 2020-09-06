import React, { useState } from "react";
import "../../../css/Buscador.css";

const Buscador = ({
  filtros,
  filtros_agregar,
  filtros_eliminar,
  cantidad_tweets,
}) => {
  const [nuevoFiltro, setNuevoFiltro] = useState("");
  const [cantidad, setCantidad] = useState("5");

  function filtro_nuevo_enter(e) {
    if (e.key === "Enter") {
      filtro_nuevo_click();
    }
  }

  function filtro_nuevo_click() {
    let nuevosFiltros = nuevoFiltro.split(" ");
    filtros_agregar(nuevosFiltros);
    setNuevoFiltro("");
  }

  function filtro_delete(filtro) {
    filtros_eliminar(filtro);
  }

  function actualizarCantidad(cantidad) {
    setCantidad(cantidad);
    cantidad_tweets(cantidad);
  }

  return (
    <div>
      <p>Cantidad tweets: {cantidad}</p>

      <input
        type="range"
        id="barraCantidad"
        class="custom-range"
        min="1"
        max="100"
        value={cantidad}
        onChange={(e) => actualizarCantidad(e.target.value)}
      ></input>

      <input
        type="text"
        placeholder="filtro"
        value={nuevoFiltro}
        onChange={(e) => setNuevoFiltro(e.target.value)}
        onKeyDown={filtro_nuevo_enter}
      />

      <input
        type="button"
        id="btn_agregar"
        value="Agregar"
        onClick={filtro_nuevo_click}
      />

      <ul className="filtros">
        {filtros.map((filtro) => (
          <li
            key={filtro}
            className="filtro_contenedor"
            onClick={() => filtro_delete(filtro)}
          >
            <div className="filtro_lado filtro_lado_frente">{filtro}</div>

            <div className="filtro_lado filtro_lado_atras">Eliminar</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Buscador;
