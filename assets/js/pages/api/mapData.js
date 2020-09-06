import axios from "axios";

export const getWorld = async () => {
  return await axios.get(
    "https://code.highcharts.com/mapdata/custom/world.geo.json"
  );
};
