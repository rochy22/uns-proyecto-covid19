import MapboxDraw from "@mapbox/mapbox-gl-draw";
import numeral from "numeral";
import lineDistance from "@turf/line-distance";
import _ from "lodash";

const RadiusMode = _.extend({}, MapboxDraw.modes.draw_line_string);

function createVertex(parentId, coordinates, path, selected) {
  return {
    type: "Feature",
    properties: {
      meta: "vertex",
      parent: parentId,
      coord_path: path,
      active: selected ? "true" : "false",
    },
    geometry: {
      type: "Point",
      coordinates,
    },
  };
}

function createGeoJSONCircle(center, radiusInKm, parentId, points = 64) {
  const coords = {
    latitude: center[1],
    longitude: center[0],
  };

  const km = radiusInKm;

  const ret = [];
  const distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
  const distanceY = km / 110.574;

  let theta;
  let x;
  let y;
  for (let i = 0; i < points; i += 1) {
    theta = (i / points) * (2 * Math.PI);
    x = distanceX * Math.cos(theta);
    y = distanceY * Math.sin(theta);

    ret.push([coords.longitude + x, coords.latitude + y]);
  }
  ret.push(ret[0]);

  return {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [ret],
    },
    properties: {
      parent: parentId,
    },
  };
}

function getDisplayMeasurements(feature) {
  const drawnLength = lineDistance(feature) * 1000;

  let metricUnits = "m";
  let metricFormat = "0,0";
  let metricMeasurement;

  let standardUnits = "feet";
  let standardFormat = "0,0";
  let standardMeasurement;

  metricMeasurement = drawnLength;
  if (drawnLength >= 1000) {
    // if over 1000 meters, upgrade metric
    metricMeasurement = drawnLength / 1000;
    metricUnits = "km";
    metricFormat = "0.00";
  }

  standardMeasurement = drawnLength * 3.28084;
  if (standardMeasurement >= 5280) {
    standardMeasurement /= 5280;
    standardUnits = "mi";
    standardFormat = "0.00";
  }

  const displayMeasurements = {
    metric: `${numeral(metricMeasurement).format(metricFormat)} ${metricUnits}`,
    standard: `${numeral(standardMeasurement).format(
      standardFormat
    )} ${standardUnits}`,
  };

  return displayMeasurements;
}

const doubleClickZoom = {
  enable: (ctx) => {
    setTimeout(() => {
      if (
        !ctx.map ||
        !ctx.map.doubleClickZoom ||
        !ctx._ctx ||
        !ctx._ctx.store ||
        !ctx._ctx.store.getInitialConfigValue
      )
        return;
      if (!ctx._ctx.store.getInitialConfigValue("doubleClickZoom")) return;
      ctx.map.doubleClickZoom.enable();
    }, 0);
  },
};
RadiusMode.onSetup = function (opts) {
  const props = MapboxDraw.modes.draw_line_string.onSetup.call(this, opts);
  const circle = this.newFeature({
    type: "Feature",
    properties: {
      meta: "radius",
    },
    geometry: {
      type: "Polygon",
      coordinates: [[]],
    },
  });
  this.addFeature(circle);

  return {
    ...props,
    circle,
  };
};

RadiusMode.clickAnywhere = function (state, e) {
  if (state.currentVertexPosition === 1) {
    state.line.addCoordinate(0, e.lngLat.lng, e.lngLat.lat);
    return this.changeMode("simple_select", { featureIds: [state.line.id] });
  }
  this.updateUIClasses({ mouse: "add" });
  state.line.updateCoordinate(
    state.currentVertexPosition,
    e.lngLat.lng,
    e.lngLat.lat
  );
  if (state.direction === "forward") {
    state.currentVertexPosition += 1;
    state.line.updateCoordinate(
      state.currentVertexPosition,
      e.lngLat.lng,
      e.lngLat.lat
    );
  } else {
    state.line.addCoordinate(0, e.lngLat.lng, e.lngLat.lat);
  }

  return null;
};

RadiusMode.onMouseMove = function (state, e) {
  MapboxDraw.modes.draw_line_string.onMouseMove.call(this, state, e);
  const geojson = state.line.toGeoJSON();
  const center = geojson.geometry.coordinates[0];
  const radiusInKm = lineDistance(geojson, "kilometers");
  const circleFeature = createGeoJSONCircle(center, radiusInKm, state.line.id);
  circleFeature.properties.meta = "radius";
  state.circle.setCoordinates(circleFeature.geometry.coordinates);
};

RadiusMode.onStop = function (state) {
  doubleClickZoom.enable(this);

  this.activateUIButton();

  if (this.getFeature(state.line.id) === undefined) return;

  state.line.removeCoordinate("0");
  if (state.line.isValid()) {
    const geojson = state.line.toGeoJSON();
    this.deleteFeature([state.line.id], { silent: true });

    this.map.fire("draw.create", {
      features: [state.circle.toGeoJSON()],
    });
  } else {
    this.deleteFeature([state.line.id], { silent: true });
    this.changeMode("simple_select", {}, { silent: true });
  }
};

RadiusMode.toDisplayFeatures = function (state, geojson, display) {
  const isActiveLine = geojson.properties.id === state.line.id;
  geojson.properties.active = isActiveLine ? "true" : "false";
  if (!isActiveLine) return display(geojson);

  if (geojson.geometry.coordinates.length < 2) return null;
  geojson.properties.meta = "feature";

  display(
    createVertex(
      state.line.id,
      geojson.geometry.coordinates[
        state.direction === "forward"
          ? geojson.geometry.coordinates.length - 2
          : 1
      ],
      `${
        state.direction === "forward"
          ? geojson.geometry.coordinates.length - 2
          : 1
      }`,
      false
    )
  );

  display(geojson);

  const displayMeasurements = getDisplayMeasurements(geojson);

  const currentVertex = {
    type: "Feature",
    properties: {
      meta: "currentPosition",
      radiusMetric: displayMeasurements.metric,
      radiusStandard: displayMeasurements.standard,
      parent: state.line.id,
    },
    geometry: {
      type: "Point",
      coordinates: geojson.geometry.coordinates[1],
    },
  };
  display(currentVertex);

  return null;
};

function getJson(lat1, long1, lat2, long2) {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
            [long1, lat1],
            [long2, lat2],
          ],
        },
      },
    ],
  };
}

function mygetDisplayMeasurements(lat1, long1, lat2, long2) {
  var mygeoJson = getJson(lat1, long1, lat2, long2);
  const drawnLength = lineDistance(mygeoJson) * 1000;

  let metricUnits = "m";
  let metricFormat = "0,0";
  let metricMeasurement;

  let standardUnits = "feet";
  let standardFormat = "0,0";
  let standardMeasurement;

  metricMeasurement = drawnLength;
  if (drawnLength >= 1000) {
    metricMeasurement = drawnLength / 1000;
    metricUnits = "km";
    metricFormat = "0.00";
  }

  standardMeasurement = drawnLength * 3.28084;
  if (standardMeasurement >= 5280) {
    standardMeasurement /= 5280;
    standardUnits = "mi";
    standardFormat = "0.00";
  }

  const displayMeasurements = {
    metric: `${numeral(metricMeasurement).format(metricFormat)}${metricUnits}`,
    standard: `${numeral(standardMeasurement).format(
      standardFormat
    )}${standardUnits}`,
  };
  return displayMeasurements.metric;
}
export { RadiusMode, mygetDisplayMeasurements };
