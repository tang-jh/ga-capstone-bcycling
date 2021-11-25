import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import faker from "faker";

const PeopleThumb = (props) => {
  const { userid, username, apibase } = props;
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/${apibase}/${props.userid}`);
  };
  //  src={faker.image.avatar()}
  return (
    <Card style={{ width: "18rem" }} className="p-3" onClick={handleClick}>
      <Card.Img variant="top" src={faker.image.imageUrl(200, 250, "people")} />
      <Card.Title>{props.username}</Card.Title>
    </Card>
  );
};

export default PeopleThumb;
