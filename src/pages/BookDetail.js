import React from "react";
import backgroundImage from "../assets/new-background.png"; // 배경 이미지 경로
import backArrow from "../assets/back-arrow.png";
import bookImage from "../assets/temp-book-image.png";
import unCheckedLike from "../assets/unchecked-like.png";
import unCheckedHate from "../assets/unchecked-hate.png";
import "../styles/BookDetail.css";

const BookDetail = () => {
  return (
    <div
      className="book-detail-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="white-background"></div>
      <div className="main-column-container">
        <div className="top-row">
          <button className="back-button">
            <img src={backArrow} alt="뒤로가기"></img>
          </button>
          <div className="back-text">뒤로가기</div>
        </div>
        <div className="bottom-column">
          <div className="main-row-container">
            <div className="left-column-container">
              <div className="book-image">
                <img src={bookImage} alt="책 표지"></img>
              </div>
              <div className="feedback-container">
                <button className="like-button">
                  <img src={unCheckedLike}></img>
                </button>
                <button className="hate-button">
                  <img src={unCheckedHate}></img>
                </button>
              </div>
            </div>
            <div className="right-column-container">
              <div className="book-title">행복해 행복해 나도 너도</div>
              <div className="book-info">
                글・김종원 | 유레카출판사 | 2024년 10월 18일
              </div>
              <div className="book-text-container">
                <div className="book-text">
                  띵동, 행복한 하루가 찾아왔습니다! 다정하게 말하면 다정한
                  하루를 살게 되고 행복하다고 외치면 그 순간, 모든 것이 행복의
                  재료가 됩니다.
                </div>
              </div>
              <button className="read-button">독서하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
