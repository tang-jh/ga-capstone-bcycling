import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

const PeopleThumb = (props) => {
  const { userid, username, apibase } = props;
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/${apibase}/${props.userid}`);
  };
  //  src={faker.image.avatar()}
  // faker.image.imageUrl(200, 250, "people")
  return (
    <Card style={{ width: "18rem" }} className="p-3" onClick={handleClick}>
      <Card.Img variant="top" src={"https://via.placeholder.com/150"} />
      <Card.Title>{props.username}</Card.Title>
    </Card>
  );
};

export default PeopleThumb;
