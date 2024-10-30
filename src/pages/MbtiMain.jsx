import React from "react";
import backgroundImage from "../assets/new-background.png"; // 배경 이미지 경로 
import "../styles/MbtiMain.css";
import { useNavigate } from "react-router-dom";
import heartSticker from "../assets/ggumi-heart.png";

const MbtiMain = () => {
  const navigate = useNavigate();

  const handleStarClick = () => {
    navigate("/mbti/survey");
  };

  return (
    <div
      className="mbti-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="ggumi-logo-container">
        {/*<img src={heartSticker} alt="꾸미 로고" className="ggumi-heart-logo" />*/}
        <div className="main-title">꾸미</div>
      </div>
      <div className="sub-title-container">
        <div className="sub-title">MBTI로 보는</div> 
        <div className="sub-title2">우리 아이 성향 검사</div>
      </div>
      <div className="explanation-container">
        <div className="question-explanation">20 문항 (15 - 20분 소요)</div>
        {/*<div className="time-explanation">15 - 20분 소요</div>*/}
      </div>
      <div className="button-container">
        <div className="start-button" onClick={handleStarClick}>
          시작해 볼까요?
        </div>
      </div>
    </div>
  );
};

export default MbtiMain;
