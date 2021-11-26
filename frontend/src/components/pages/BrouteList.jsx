import React, { useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ListTable from "../ListTable";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { tokenAtom } from "./LoginSignup";
import { useAtom } from "jotai";

const MYFIELDS = ["title", "distance", "difficulty"];
const FRIENDFIELDS = ["username", "title", "distance", "difficulty"];

const BrouteList = (props) => {
  console.log("Reached Broutelist");

  const { mode, constants } = props;
  const [person, setPerson] = useState("");
  const [pageData, setPageData] = useState([]);
  const token = useAtom(tokenAtom)[0];
  const params = useParams();
  console.log("mode", mode);
  console.log(constants);
  console.log(jwt_decode(token.access).user_id);

  useEffect(() => {
    if (mode === constants.MYROUTES) {
      console.log("Broutelist", mode);
      setPerson("My");
    } else if (mode === constants.FRIENDS) {
      if (params) {
        axios.get(`/api/userlookup/${params.userid}/`).then((res) => {
          console.log("Lookup:", res.data);
          setPerson(res.data.username);
        });
      }
    }
  }, [mode, constants, person, params]);

  useEffect(() => {
    if (mode === constants.MYROUTES) {
      const userid = jwt_decode(token.access).user_id;
      axios
        .get(`/api/brouteslist/${userid}/`, {
          headers: { Authorization: `Bearer ${token.access}` },
        })
        .then((res) => {
          console.log("myroute", res.data);
          const dataArr = res.data.features.map((item) => ({
            id: item.id,
            username: item.properties.userFK,
            title: item.properties.title,
            distance: item.properties.distance,
            difficulty: item.properties.difficulty,
          }));
          setPageData(dataArr);
        })
        .catch((err) => {
          console.log(err.response.status);
        });
    } else if (params) {
      axios
        .get(`/api/brouteslist/${params.userid}/`, {
          headers: { Authorization: `Bearer ${token.access}` },
        })
        .then((res) => {
          const dataArr = res.data.features.map((item) => ({
            id: item.id,
            username: item.properties.userFK,
            title: item.properties.title,
            distance: item.properties.distance,
            difficulty: item.properties.difficulty,
          }));
          setPageData(dataArr);
        })
        .catch((err) => {
          console.log(err.response.status);
        });
    }
  }, [mode, params, constants, token]);

  return (
    <Container>
      <Stack className="mt-5" gap={5}>
        <h1>{person ? person : ""} routes</h1>
        <ListTable
          className="col-sm-6 mx-auto"
          fields={mode === constants.MYROUTES ? MYFIELDS : FRIENDFIELDS}
          tableData={pageData ? pageData : []}
          baseLink="/broutes/"
        />
      </Stack>
    </Container>
  );
};

export default BrouteList;
