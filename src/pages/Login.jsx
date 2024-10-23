import React, { useEffect } from "react";
import backgroundImage from "../assets/background-yellow.png"; // 배경 이미지 경로
import "../styles/Login.css";
import kakaoLogin from "../assets/kakao_login_large_wide.png";
import welcomeSticker from "../assets/ggumi-welcome.png";

const CLIENT_ID = "49ca0576cd2ac11f1b1e5b04b39741b5";
const REDIRECT_URI = "http://localhost:3000/auth/callback";

const Login = () => {
  useEffect(() => {
    // 카카오 SDK 로드
    const loadKakaoSDK = () => {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
      script.async = true;
      script.onload = () => {
        window.Kakao.init(CLIENT_ID);
      };
      document.body.appendChild(script);
    };

    loadKakaoSDK();
  }, []);

  const handleLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

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
      <button className="login" onClick={handleLogin}>
        <img src={kakaoLogin} alt="kakao login" className="kakao-login"></img>
      </button>
    </div>
  );
};

export default Login;
