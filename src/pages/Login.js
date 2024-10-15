import React from "react";
import backgroundImage from "../assets/background-yellow.png"; // 배경 이미지 경로
import "../styles/Login.css";
import kakaoLogin from "../assets/kakao_login_large_wide.png";
import welcomeSticker from "../assets/ggumi-welcome.png";

const Login = () => {
  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="ggumi-title">
        <div className="ggumi-main-title">꾸미</div>
        <div className="ggumi-semi-title">꾸미와 함께 꿈을 이뤄봐요</div>
      </div>
      <img
        src={welcomeSticker}
        className="welcome-sticker"
        alt="welcome sticker"
      ></img>
      <button className="login">
        <img src={kakaoLogin} alt="kakao login" className="kakao-login"></img>
      </button>
    </div>
  );
};

export default Login;
