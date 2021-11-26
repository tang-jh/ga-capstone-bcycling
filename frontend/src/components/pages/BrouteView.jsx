import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { tokenAtom } from "./LoginSignup";
import { useAtom } from "jotai";
import { Container, Row, Col, Stack, Button } from "react-bootstrap";
import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import axios from "axios";
import Loading from "../Loading";
import NumberFormatter from "../NumberFormatter";
import ListTable from "../ListTable";
import CommentReply from "../CommentReply";

const constants = {
  READ: "read",
  CREATE: "create",
};

const BrouteView = (props) => {
  const params = useParams();
  const [status, setStatus] = useState("idle");
  const token = useAtom(tokenAtom)[0];
  const [pageData, setPageData] = useState();
  const [userbase, setUserbase] = useState([]);
  const [comments, setComments] = useState([]);
  const [cleanComments, setCleanComments] = useState([]);
  const [commentDetails, setCommentDetails] = useState({});
  const [commentMode, setCommentMode] = useState();
  // const [modalInput, setModalInput] = useState();
  const [show, setShow] = useState(false);

  // Fetch userlookup data for username matching
  useEffect(() => {
    axios
      .get("/api/userlookup/", {
        headers: { Authorization: `Bearer ${token.access}` },
      })
      .then((res) => {
        console.log("Lookup data", res.data);
        setUserbase(res.data);
      })
      .catch((err) => {
        console.log("Lookup failed", err.response.status);
      });
  }, [token]);

  // Fetch Broute detail
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
  }, [token, params]);

  // Fetch route's comments
  useEffect(() => {
    setStatus("pending");
    axios
      .get(`/api/broutes/${params.r_id}/comments/`, {
        headers: { Authorization: `Bearer ${token.access}` },
      })
      .then((res) => {
        console.log("Comments", res.data);
        setComments(res.data);
        setStatus("resolved");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, params]);

  // Function for post fetch username matching
  const nameMatch = (namelist, id) => {
    for (const n of namelist) {
      console.log(`nid: ${n.id} - id: ${id}`);
      if (n.id === id) {
        return n.username;
      }
    }
    return;
  };

  // Process fetched data into usable pagedata
  useEffect(() => {
    if (comments && userbase) {
      const data = comments.map((item) => ({
        ...item,
        id: item.author,
        username: nameMatch(userbase, item.author),
      }));
      setCleanComments(data);
      console.log("cleaned comments", data);
    }
  }, [comments, userbase]);

  const handleNewComment = () => {
    setCommentMode(constants.CREATE);
    setShow(true);
  };

  const handleRowClick = (commentDetails) => {
    console.log(commentDetails);
    setCommentDetails(commentDetails);
    setCommentMode(constants.READ);
    setShow(true);
  };

  const handleCloseModal = () => {
    setShow(false);
  };

  // const handleModalInput = (e) => {
  //   e.preventDefault();
  //   console.log("modalinput", e.target.value);
  //   setModalInput(e.target.value);
  //   console.log("modalinput-state: ", modalInput);
  // };

  // const handleModalSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("modalinput: ", modalInput);
  //   axios
  //     .post(
  //       `/api/broutes/${params.r_id}/comments/`,
  //       { comment: modalInput },
  //       {
  //         headers: { Authorization: `Bearer ${token.access}` },
  //       }
  //     )
  //     .then(() => {
  //       setShow(false);

  //       // Swal.fire({
  //       //   icon: "success",
  //       //   text: "Awesome post!",
  //       //   timer: 1000,
  //       // }).then(() => {
  //       //   navigate(`/broutes/${params.r_id}`);
  //       // });
  //     });
  // };

  // Map bbox setting
  const LoadedRoute = ({ pageData }) => {
    const map = useMap();
    if (pageData) {
      const routeLayer = L.geoJSON(pageData).addTo(map);
      map.fitBounds(routeLayer.getBounds());
    }
    return null;
  };

  // Map route layer
  const RouteLayer = () => {
    if (pageData) {
      return <GeoJSON data={pageData} />;
    }
    return null;
  };

  return (
    <Container>
      <Row>
        <Col sm={6}>
          <Stack gap={2}>
            <h5>{pageData ? pageData?.properties?.title : <Loading />}</h5>
            <p>
              Distance:{" "}
              {pageData ? (
                <NumberFormatter
                  val={pageData?.properties?.distance}
                  decimalPlace={2}
                />
              ) : (
                <Loading />
              )}{" "}
            </p>
            <p>
              Difficulty:{" "}
              {pageData ? pageData?.properties?.difficulty : <Loading />}
            </p>
            <p>Description</p>
            <p>{pageData ? pageData?.properties?.description : <Loading />} </p>
          </Stack>
        </Col>
        <Col sm={6}>
          <MapContainer
            id="view-map"
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
        </Col>
      </Row>
      <Button onClick={handleNewComment}>New Comment</Button>
      <ListTable
        className="col-sm-6 mx-auto"
        fields={["comment", "username"]}
        tableData={cleanComments ? cleanComments : []}
        baseLink="/comments/"
        click={handleRowClick}
      />
      <CommentReply
        constants={constants}
        mode={commentMode}
        r_id={params.r_id}
        title={commentDetails?.username}
        body={commentDetails?.comment}
        show={show}
        handleCloseModal={handleCloseModal}
        // handleModalInput={handleModalInput}
        // handleModalSubmit={handleModalSubmit}
      />
      {/* nested route for comments */}
    </Container>
  );
};

export default BrouteView;
