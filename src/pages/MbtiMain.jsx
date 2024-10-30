import React from "react";
import backgroundImage from "../assets/background-yellow.png"; // 배경 이미지 경로
import "../styles/MbtiMain.css";
import { useNavigate } from "react-router-dom";
import heartSticker from "../assets/ggumi-heart.png";

const MbtiMain = () => {

const navigate = useNavigate();

const handleStarClick = () => {
  navigate("/mbti/survey")
}

  return (
    <div className="mbti-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="ggumi-logo-container">
        <img src={heartSticker} alt="꾸미 로고" className="ggumi-heart-logo" />
        <h1 className="main-title">꾸미</h1>
      </div>
      <div className="sub-title-container">
        <h2 className="sub-title">MBTI로 보는</h2> 
        <h2 className="sub-title2">우리 아이 성향 검사</h2>
      </div>
      <div className="explanation-container">
        <h3 className="question-explanation">20 문항</h3>
        <h3 className="time-explanation">15 - 20분 소요</h3>
      </div>
      <div className="button-container">
        <div className="start-button" onClick={handleStarClick}>시작해 볼까요?</div>
      </div>
    </div>
  );
};


export default MbtiMain;