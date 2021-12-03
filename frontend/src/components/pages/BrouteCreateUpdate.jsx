import React, { useRef, useState, useEffect } from "react";
import { Container, Form, Stack, Button } from "react-bootstrap";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  GeoJSON,
} from "react-leaflet";
import axios from "axios";
import { tokenAtom } from "./LoginSignup";
import { useAtom } from "jotai";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

// import urlcat from "urlcat";

// const GEOCODEBASE = "https://graphhopper.com/api/1/geocode";
const ROUTEBASE = "https://graphhopper.com/api/1/route?";

const BrouteCreateUpdate = () => {
  // const [show, setShow] = useState(false);
  // const [fromVal, setFromVal] = useState([]);
  // const [toVal, setToVal] = useState([]);
  // const fromInput = useRef(null);
  // const toInput = useRef(null);
  const navigate = useNavigate();
  const token = useAtom(tokenAtom)[0];
  const [routepoint, setRoutepoint] = useState([]);
  const [route, setRoute] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [inputVal, setInputVal] = useState({});

  useEffect(() => {
    if (routepoint.length === 2) {
      axios
        .get(
          `${ROUTEBASE}point=${routepoint[0][0]},${routepoint[0][1]}&point=${routepoint[1][0]},${routepoint[1][1]}&profile=bike&points_encoded=false&instructions=false&key=${process.env.REACT_APP_GRAPHHOPPER_KEY}`
        )
        .then((res) => {
          console.log(res.data);
          setRoute(res.data);
        });
    }
  }, [routepoint]);

  useEffect(() => {
    if (
      inputVal?.title?.length > 0 &&
      inputVal?.difficulty?.length > 0 &&
      Object.keys(route).length > 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [inputVal, route]);

  const MapPoints = () => {
    const map = useMapEvents({
      click: (e) => {
        const coord = [e.latlng.lat.toFixed(4), e.latlng.lng.toFixed(4)];
        if (routepoint.length >= 2) {
          setRoutepoint([coord]);
        } else {
          setRoutepoint([...routepoint, coord]);
        }
        console.log(routepoint, map);
      },
    });
    return routepoint
      ? routepoint.map((marker) => (
          <Marker interactive={false} position={marker} />
        ))
      : null;
  };

  const RouteLayer = () => {
    if (Object.keys(route).length > 0) {
      return <GeoJSON data={route.paths[0].points} />;
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const routeData = route.paths[0];
    inputVal.distance = routeData.distance;
    inputVal.route = routeData.points;
    inputVal.userFK = jwt_decode(token.access).user_id;
    console.log(inputVal);
    console.log(jwt_decode(token.access));
    axios
      .post("/api/broutes/", inputVal, {
        headers: { Authorization: `Bearer ${token.access}` },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          text: "New route created!",
          timer: 1500,
        }).then(() => {
          navigate("/dashboard", { replace: true });
        });
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === "title") {
      setInputVal({ ...inputVal, title: e.target.value });
    } else if (e.target.name === "difficulty-input") {
      setInputVal({ ...inputVal, difficulty: e.target.value });
    } else if (e.target.name === "description-input") {
      setInputVal({ ...inputVal, description: e.target.value });
    }
  };

  return (
    <Container>
      <Stack direction="horizontal" gap={5}>
        <Form>
          <Form.Group className="mb-5">
            <Form.Label>From</Form.Label>
            <Form.Control
              className="mb-2"
              name="from-place"
              type="text"
              placeholder="place name"
              disabled={true}
              // ref={fromInput}
            />
            {/* <Overlay
              target={fromInput.current}
              show={show}
              placement="right"
            ></Overlay> */}
            <Form.Label>To</Form.Label>
            <Form.Control
              className="mb-2"
              name="to-place"
              type="text"
              placeholder="place name"
              disabled={true}
              // ref={toInput}
            />
            <Form.Label>Title</Form.Label>
            <Form.Control
              className="mb-2"
              name="title"
              type="text"
              placeholder="title"
              onChange={handleChange}
            />
            <Form.Label>Difficulty</Form.Label>
            <Form.Select
              className="mb-2"
              name="difficulty-input"
              type="text"
              onChange={handleChange}
            >
              <option placeholder="Select difficulty"></option>
              <option value="EASY">Easy</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="DIFFICULT">Difficult</option>
            </Form.Select>
            <Form.Label>Description</Form.Label>
            <Form.Control
              className="mb-2"
              name="description-input"
              as="textarea"
              placeholder="description"
              onChange={handleChange}
            />
          </Form.Group>
          <Button onClick={handleSubmit} disabled={disabled}>
            Create New Route
          </Button>
        </Form>
        <MapContainer
          id="route-map"
          zoom={12}
          scrollWheelZoom={true}
          center={[1.3521, 103.8198]}
          // whenCreated={setMapcanvas}
          // onClick={handleMapClick}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapPoints />
          <RouteLayer />
        </MapContainer>
      </Stack>
    </Container>
  );
};

export default BrouteCreateUpdate;
