import React from "react";
import backgroundImage from "../assets/background-yellow.png"; // 배경 이미지 경로

const Login = () => {
  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    ></div>
  );
};

export default Login;
