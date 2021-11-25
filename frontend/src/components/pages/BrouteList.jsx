import React, { useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ListTable from "../ListTable";
import axios from "axios";

const BrouteList = (props) => {
  console.log("Reached Broutelist");

  const { mode, constants } = props;
  const [person, setPerson] = useState("");
  const params = useParams();

  useEffect(() => {
    if (mode === constants.MYROUTE) {
      setPerson("My");
    } else if (mode === constants.FRIENDS) {
      if (params) {
        axios.get(`/api/userlookup/${params.userid}/`).then((res) => {
          console.log(res.data);
          setPerson(res.data.username);
        });
      }
    }
  }, [mode, constants, person, params]);

  return (
    <Container>
      <Stack className="mt-5" gap={5}>
        <h1>{person ? person : ""}</h1>
        {/* <ListTable
        // className="col-sm-6 mx-auto"
        // fields={["id", "username", "title", "distance", "difficulty"]}
        // tableData={pageData ? pageData : []}
        // baseLink="/api/broutes/"
        /> */}
      </Stack>
    </Container>
  );
};

export default BrouteList;
