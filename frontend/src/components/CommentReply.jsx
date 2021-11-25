import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Modal, Form, Button } from "react-bootstrap";
import { tokenAtom } from "./pages/LoginSignup";
import { useAtom } from "jotai";
import axios from "axios";
import Swal from "sweetalert2";

const CommentReply = (props) => {
  const { title, body, show, mode, constants, r_id, handleCloseModal } = props;
  const { READ, CREATE } = constants;
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState();
  const token = useAtom(tokenAtom)[0];

  const handleChange = (e) => {
    e.preventDefault();
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `/api/broutes/${r_id}/comments/`,
        { comment: inputVal },
        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          text: "Awesome post!",
          timer: 1000,
        }).then(() => {
          navigate(`/broutes/${r_id}`);
        });
      });
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{mode === READ ? title : "New comment"}</Modal.Title>
      </Modal.Header>
      {mode === CREATE ? (
        <Form>
          <Form.Control
            name="comment-input"
            type="text"
            placeholder="comments"
            onChange={handleChange}
          />
        </Form>
      ) : null}
      {mode === READ ? <Modal.Body>{body}</Modal.Body> : null}

      {mode === CREATE ? (
        <Modal.Footer>
          <Button
            onClick={handleSubmit}
            // disabled={inputVal?.length > 0 ? false : true}
          >
            Post!
          </Button>
        </Modal.Footer>
      ) : null}
    </Modal>
  );
};

export default CommentReply;
