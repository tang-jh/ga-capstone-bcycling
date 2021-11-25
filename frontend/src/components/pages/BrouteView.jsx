import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { tokenAtom } from "./LoginSignup";
import { useAtom } from "jotai";
import { Outlet } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import axios from "axios";
import Loading from "../Loading";
import NumberFormatter from "../NumberFormatter";

const BrouteView = (props) => {
  const params = useParams();
  const [status, setStatus] = useState("idle");
  const token = useAtom(tokenAtom)[0];
  const [pageData, setPageData] = useState();
  // const [map, setMap] = useState(null);

  useEffect(() => {
    setStatus("pending");
    axios
      .get(`/api/broutes/${params.r_id}/`, {
        headers: { Authorization: `Bearer ${token.access}` },
      })
      .then((res) => {
        console.log("Broute detail: ", res.data);
        setPageData(res.data);
        setStatus("resolved");
      })
      .catch((err) => {
        console.log(err.response);
        setStatus("error");
      });
  }, []);

  const LoadedRoute = ({ pageData }) => {
    console.log("Loaded route");
    const map = useMap();

    if (pageData) {
      console.log("Loaded route pagedata");
      const routeLayer = L.geoJSON(pageData).addTo(map);
      map.fitBounds(routeLayer.getBounds());
    }
    return null;
  };

  const RouteLayer = () => {
    if (pageData) {
      return <GeoJSON data={pageData} />;
    }
    return null;
  };

  return (
    <Container>
      <Row>
        <Col>
          <h5>{pageData ? pageData.properties.title : <Loading />}</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            Distance:{" "}
            {pageData ? (
              <NumberFormatter
                val={pageData.properties.distance}
                decimalPlace={2}
              />
            ) : (
              <Loading />
            )}{" "}
          </p>
        </Col>
        <Col>
          <p>
            Difficulty:{" "}
            {pageData ? pageData.properties.difficulty : <Loading />}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Description</p>
          <p>{pageData ? pageData.properties.description : <Loading />} </p>
        </Col>
      </Row>
      <Row>
        <MapContainer
          id="route-map"
          zoom={12}
          scrollWheelZoom={true}
          center={[1.3521, 103.8198]}
          // whenCreated={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RouteLayer />
          <LoadedRoute pageData={pageData} />
        </MapContainer>
      </Row>
      {/* nested route for comments */}
      <Outlet />
    </Container>
  );
};

export default BrouteView;
