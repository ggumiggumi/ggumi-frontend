import React, { useEffect, useState } from "react";
import { API_DOMAIN } from "../apis/api";
import { useParams } from "react-router-dom";

import "../styles/BookDetail.css";

import bookImage from "../assets/temp-book-image.png";
import backArrow from "../assets/back-arrow.png";
import backgroundImage from "../assets/new-background.png";
import CheckedLike from "../assets/checked-like.png";
import unCheckedLike from "../assets/unchecked-like.png";
import CheckedHate from "../assets/checked-hate.png";
import unCheckedHate from "../assets/unchecked-hate.png";

const BookDetail = () => {
  const { bookId } = useParams();

  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 좋아요 및 싫어요를 확인하기 위한 변수
  const [isLiked, setIsLiked] = useState(false);
  const [isHated, setIsHated] = useState(false);

  // 추후에 자녀의 아이디를 받아서 사용
  const childId = 1;

  useEffect(() => {
    const getBookDetail = async () => {
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

        if (bookData.feedback === "UP") {
          setIsLiked(true);
          setIsHated(false);
        } else if (bookData.feedback === "DOWN") {
          setIsLiked(false);
          setIsHated(true);
        }
        setBookDetails(bookData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getBookDetail();
  }, [bookId, childId]);

  const handleLike = async () => {
    try {
      const response = await fetch(`${API_DOMAIN}/book-detail/${bookId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ childId: childId }),
      });

      if (response.ok) {
        setIsLiked(true); // 좋아요 버튼 선택 상태로 변경
        setIsHated(false); // 싫어요 선택 취소
      } else {
        console.error("Error liking the book");
      }
    } catch (error) {
      console.error("Error liking the book:", error);
    }
  };

  const handleHate = async () => {
    try {
      const response = await fetch(`${API_DOMAIN}/book-detail/${bookId}/hate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ childId: childId }),
      });

      if (response.ok) {
        setIsHated(true); // 싫어요 버튼 선택 상태로 변경
        setIsLiked(false); // 좋아요 선택 취소
      } else {
        console.error("Error disliking the book");
      }
    } catch (error) {
      console.error("Error disliking the book:", error);
    }
  };

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
                <button className="like-button" onClick={handleLike}>
                  <img
                    src={isLiked ? CheckedLike : unCheckedLike}
                    alt="좋아요"
                  ></img>
                </button>
                <button className="hate-button" onClick={handleHate}>
                  <img
                    src={isHated ? CheckedHate : unCheckedHate}
                    alt="싫어요"
                  ></img>
                </button>
              </div>
            </div>
            <div className="right-column-container">
              <div className="book-title">{bookDetails.title}</div>
              <div className="book-info">
                글・{bookDetails.author} | {bookDetails.publisher} |{" "}
                {bookDetails.createdAt}
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
