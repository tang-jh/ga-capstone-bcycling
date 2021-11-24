// import React, { useState, useEffect } from "react";
// import "axios";
// import axios from "axios";

const LoginSignup = (props) => {
  //   const [trial, setTrial] = useState({});
  //   useEffect(() => {
  //     const getUsers = async () => {
  //       const res = await axios.get("/api/testview/");
  //       setTrial(res.data);
  //     };
  //     getUsers();
  //   }, []);

  //   console.log(trial);

  return (
    <div>
      <p>Login Signup component</p>
      <p>Mode: {props.mode}</p>
    </div>
  );
};

export default LoginSignup;
