import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { atom, useAtom } from "jotai";
import Swal from "sweetalert2";
import { Container } from "react-bootstrap";

export const tokenAtom = atom(null);

const LoginSignup = (props) => {
  const { mode, constants } = props;
  const setToken = useAtom(tokenAtom)[1];
  const [status, setStatus] = useState("idle");
  const [inputVal, setInputVal] = useState({});
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setStatus("pending");
    const username = e.target.username.value;
    const password = e.target.password.value;
    axios
      .post(`/api/token/`, { username: username, password: password })
      .then((res) => {
        setToken(res.data);
        setStatus("resolved");
        Swal.fire({
          text: `Redirecting to dashboard page`,
          timer: 1500,
        }).then(() => {
          navigate("/dashboard", { replace: true });
        });
      })
      .catch((err) => {
        setStatus("error");
        Swal.fire({
          icon: "error",
          text: err.response.data.detail,
          timer: 1500,
        });
      });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setStatus("pending");
    const username = e.target.username.value;
    const password = e.target.password.value;
    axios
      .post(`/api/signup/`, { username: username, password: password })
      .then((res) => {
        setStatus("resolved");
        Swal.fire({
          text: `${res.data.detail} \nRedirecting to login page`,
          timer: 1500,
        }).then(() => {
          navigate("/login", { replace: true });
        });
      })
      .catch((err) => {
        const errMsg = err.response.data;
        setStatus("error");
        if (errMsg.target === "username") {
          Swal.fire({
            icon: "error",
            text: errMsg.detail,
            timer: 1500,
          }).then(() => {
            document.querySelector("#username-input").value = "";
            document.querySelector("#password-input").value = "";
            setInputVal({});
          });
        }
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === "username") {
      setInputVal({ ...inputVal, username: e.target.value });
    } else if (e.target.name === "password") {
      setInputVal({ ...inputVal, password: e.target.value });
    }
  };

  return (
    <Container>
      <form onSubmit={mode === constants.LOGIN ? handleLogin : handleSignUp}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username-input"
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password-input"
          onChange={handleChange}
        />
        <input
          type="submit"
          value={mode === constants.LOGIN ? "Log In" : "Sign Up"}
          disabled={inputVal?.password?.length >= 8 ? false : true}
        />
      </form>
      {mode === constants.LOGIN ? (
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      ) : null}
    </Container>
  );
};

export default LoginSignup;
