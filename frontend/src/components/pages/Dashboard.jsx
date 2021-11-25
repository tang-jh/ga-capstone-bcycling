import React, { useState, useEffect } from "react";
import { Container, Button, Stack } from "react-bootstrap";
import ListTable from "../ListTable";
import axios from "axios";
import { tokenAtom } from "./LoginSignup";
import { useAtom } from "jotai";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const [status, setStatus] = useState("idle");
  const [pageData, setPageData] = useState({});
  const [token, setToken] = useAtom(tokenAtom);
  const navigate = useNavigate();

  useEffect(() => {
    setStatus("pending");
    axios
      .get("/api/dashboard/", {
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
        console.log("Dashboard data: ", dataArr);
      })
      .catch((err) => {
        console.log(err.response.status);
        // Method to auto refresh token and continue the action
      });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/myroutes/new");
  };

  return (
    <Container>
      <Stack className="mt-5" gap={5}>
        <Button
          className="col-sm-6 mx-auto"
          variant="primary"
          onClick={handleClick}
        >
          Plan New Route
        </Button>
        <ListTable
          className="col-sm-6 mx-auto"
          fields={["id", "username", "title", "distance", "difficulty"]}
          tableData={pageData ? pageData : []}
          baseLink="/broutes/"
        />
      </Stack>
    </Container>
  );
};

export default Dashboard;
