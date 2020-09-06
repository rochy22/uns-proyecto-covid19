import React, { useState } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import { RadiusMode } from "./Maps.js";
import style from "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

var Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoicm9zZWdvdmlhMjIiLCJhIjoiY2thMWc1cG4wMDA1aTNmcXdjczY0ZDJtdyJ9.tKIPNEA9QCvf0aCw7i-2Qg",
});

const World = ({ initialLat, initialLng, onClickMap, setDrawingFalse }) => {
  const onDrawCreate = (feature) => {
  };

  const onDrawDelete = (feature) => {
    Map = ReactMapboxGl({
      accessToken:
        "pk.eyJ1Ijoicm9zZWdvdmlhMjIiLCJhIjoiY2thMWc1cG4wMDA1aTNmcXdjczY0ZDJtdyJ9.tKIPNEA9QCvf0aCw7i-2Qg",
    });
    setMapa(
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        center={[initialLat, initialLng]}
        containerStyle={{
          height: "70vh",
          width: "100%",
        }}
        zoom={[6]}
        className="map_world"
        onClick={onClickMap}
      >
        <DrawControl
          controls={{
            point: false,
            line_string: false,
            polygon: false,
            trash: true,
            combine_features: false,
            uncombine_features: false,
          }}
          modes={{
            radius_mode: RadiusMode,
          }}
          defaultMode="radius_mode"
          onDrawCreate={onDrawCreate}
          onDrawDelete={onDrawDelete}
          keybindings={false}
        />
      </Map>
    );
    setDrawingFalse();
  };

  const [Mapa, setMapa] = useState(
    <Map
      style="mapbox://styles/mapbox/streets-v9"
      center={[initialLat, initialLng]}
      containerStyle={{
        height: "70vh",
        width: "100%",
      }}
      zoom={[6]}
      className="map_world"
      onClick={onClickMap}
    >
      <DrawControl
        controls={{
          point: false,
          line_string: false,
          polygon: false,
          trash: true,
          combine_features: false,
          uncombine_features: false,
        }}
        modes={{
          radius_mode: RadiusMode,
        }}
        defaultMode="radius_mode"
        onDrawCreate={onDrawCreate}
        onDrawDelete={onDrawDelete}
        keybindings={false}
      />
    </Map>
  );

  return <div id="World">{Mapa}</div>;
};

export default World;
