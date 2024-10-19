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

  // 초기 feedback 상태 저장
  const [initialFeedback, setInitialFeedback] = useState({
    isLiked: false,
    isHated: false,
  });

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

        // feedback 상태에 따라 초기값 설정
        if (bookData.feedback === "UP") {
          setIsLiked(true);
          setIsHated(false);
          setInitialFeedback({ isLiked: true, isHated: false });
        } else if (bookData.feedback === "DOWN") {
          setIsLiked(false);
          setIsHated(true);
          setInitialFeedback({ isLiked: false, isHated: true });
        } else {
          setIsLiked(false);
          setIsHated(false);
          setInitialFeedback({ isLiked: false, isHated: false });
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

  // 페이지를 벗어날 때 API 호출
  const callCalculationAPI = async () => {
    try {
      // 처음에 좋아요, 현재 싫어요 또는 좋아요 체크 해제
      if (initialFeedback.isLiked === true && isLiked === false) {
        const response = await fetch(
          `${API_DOMAIN}/book-detail/${bookId}/calculation-hate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ childId: childId }),
          }
        );
        if (!response.ok) {
          throw new Error("calculation-hate API 호출에 실패했습니다.");
        }
        // 처음에 싫어요 또는 좋아요 체크 해제, 현재 좋아요
      } else if (initialFeedback.isLiked === false && isLiked === true) {
        const response = await fetch(
          `${API_DOMAIN}/book-detail/${bookId}/calculation-like`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ childId: childId }),
          }
        );
        if (!response.ok) {
          throw new Error("calculation-like API 호출에 실패했습니다.");
        }
      }
      // 변화가 없으면 API를 호출하지 않음
    } catch (error) {
      console.error("calculation API 호출 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    // 새로고침 감지
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // Chrome에서는 이 값을 설정해야 알림이 표시됩니다.
    };

    // 페이지를 벗어날 때 API 호출
    const handlePageHide = () => {
      if (!window.event) return; // 새로고침이 아닌 경우에만 호출
      callCalculationAPI();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [isLiked, isHated, initialFeedback]);

  const handleLike = async () => {
    try {
      if (isLiked) {
        // 좋아요 취소
        const response = await fetch(
          `${API_DOMAIN}/book-detail/${bookId}/undo`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ childId: childId }),
          }
        );

        if (response.ok) {
          setIsLiked(false); // 좋아요 상태 취소
          setIsHated(false); // 싫어요 상태 취소
        } else {
          console.error("Error undoing like");
        }
      } else {
        // 좋아요
        const response = await fetch(
          `${API_DOMAIN}/book-detail/${bookId}/like`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ childId: childId }),
          }
        );

        if (response.ok) {
          setIsLiked(true); // 좋아요 상태로 변경
          setIsHated(false); // 싫어요 상태 취소
        } else {
          console.error("Error liking the book");
        }
      }
    } catch (error) {
      console.error("Error liking the book:", error);
    }
  };

  const handleHate = async () => {
    try {
      if (isHated) {
        // 싫어요 취소
        const response = await fetch(
          `${API_DOMAIN}/book-detail/${bookId}/undo`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ childId: childId }),
          }
        );

        if (response.ok) {
          setIsHated(false); // 싫어요 상태 취소
          setIsLiked(false); // 좋아요 상태 취소
        } else {
          console.error("Error undoing hate");
        }
      } else {
        // 싫어요
        const response = await fetch(
          `${API_DOMAIN}/book-detail/${bookId}/hate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ childId: childId }),
          }
        );

        if (response.ok) {
          setIsHated(true); // 싫어요 상태로 변경
          setIsLiked(false); // 좋아요 상태 취소
        } else {
          console.error("Error disliking the book");
        }
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
