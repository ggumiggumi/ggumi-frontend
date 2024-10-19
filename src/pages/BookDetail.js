import React, { useEffect, useState } from "react";
import backgroundImage from "../assets/new-background.png"; // 배경 이미지 경로
import backArrow from "../assets/back-arrow.png";
import bookImage from "../assets/temp-book-image.png";
import unCheckedLike from "../assets/unchecked-like.png";
import unCheckedHate from "../assets/unchecked-hate.png";
import "../styles/BookDetail.css";
import { useParams } from "react-router-dom";
import { API_DOMAIN } from "../common/common";

const BookDetail = () => {
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const childId = 1;
  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await fetch(`${API_DOMAIN}/book-detail/${bookId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ childId: childId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }

        const result = await response.json();
        const bookData = result.data;
        console.log(bookData);
        setBookDetails(bookData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [bookId, childId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
                  <img src={unCheckedLike} alt="좋아요"></img>
                </button>
                <button className="hate-button">
                  <img src={unCheckedHate} alt="싫어요"></img>
                </button>
              </div>
            </div>
            <div className="right-column-container">
              <div className="book-title">{bookDetails.title}</div>
              <div className="book-info">
                글・김종원 | 유레카출판사 | 2024년 10월 18일
              </div>
              <div className="book-text">{bookDetails.content}</div>
              <button className="read-button">독서하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
