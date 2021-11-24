import React, { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";

const MapPoints = () => {
  const [path, setPath] = useState([]);
  const map = useMapEvents({
    click: (e) => {
      if (path.length >= 2) {
        setPath([e.latlng]);
      } else {
        setPath([...path, e.latlng]);
      }
      console.log(e.latlng);
    },
  });
  return path
    ? path.map((marker) => <Marker interactive={false} position={marker} />)
    : null;
};

export default MapPoints;
