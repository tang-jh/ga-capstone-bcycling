import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Stack, Row, Col, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { tokenAtom } from "./LoginSignup";
import { useAtom } from "jotai";
import PeopleThumb from "../PeopleThumb";

const PeopleIndex = (props) => {
  console.log(`Reached PeopleIndex`);
  const { mode, constants } = props;
  const [token, setToken] = useAtom(tokenAtom);
  const [peopleList, setPeopleList] = useState([]);
  const [userbase, setUserbase] = useState([]);
  const [pageData, setPageData] = useState([]);

  // Fetch userlookup data for username matching
  useEffect(() => {
    axios
      .get("api/userlookup/", {
        headers: { Authorization: `Bearer ${token.access}` },
      })
      .then((res) => {
        setUserbase(res.data);
      });
  }, []);

  // Fetch contextual pagedata (mode: FRIENDS/TO_REVIEW/PEOPLE)
  useEffect(() => {
    if (mode === constants.FRIENDS) {
      axios
        .get(`api/friends/`, {
          headers: { Authorization: `Bearer ${token.access}` },
        })
        .then((res) => {
          console.log("Friends list", res.data);
          setPeopleList(res.data);
        });
    } else if (mode === constants.TO_REVIEW) {
      axios
        .get(`api/to_review/`, {
          headers: { Authorization: `Bearer ${token.access}` },
        })
        .then((res) => {
          console.log("To review list", res.data);
          setPeopleList(res.data);
        });
    } else if (mode === constants.PEOPLE) {
      axios
        .get(`api/people/`, {
          headers: { Authorization: `Bearer ${token.access}` },
        })
        .then((res) => {
          console.log("People list", res.data);
          setPageData(res.data);
        });
    }
  }, [mode, constants]);

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
    if (peopleList && userbase) {
      if (mode === constants.FRIENDS) {
        const data = peopleList.map((item) => ({
          id: item.to_friend,
          username: nameMatch(userbase, item.to_friend),
        }));
        setPageData(data);
        console.log("pagedata: ", data);
      } else if (mode === constants.TO_REVIEW) {
        const data = peopleList.map((item) => ({
          id: item.requester,
          username: nameMatch(userbase, item.requester),
        }));
        setPageData(data);
        console.log("pagedata: ", data);
      }
    }
  }, [peopleList, userbase]);

  return (
    <Container>
      <div style={mode === constants.TO_REVIEW ? { display: "None" } : null}>
        <Row>
          <Col sm={6}>
            <Form>
              <Form.Control
                name="search-people"
                type="text"
                placeholder="search people"
              />
            </Form>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Button variant="primary">Search people</Button>
          </Col>
        </Row>
      </div>
      <Row>
        <Col>
          <Stack direction="horizontal" gap={2}>
            {pageData.length > 0 ? null : <p>List is empty</p>}
            {pageData.map((item) => (
              <PeopleThumb
                apibase={mode}
                userid={item.id}
                username={item.username}
              />
            ))}
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default PeopleIndex;
