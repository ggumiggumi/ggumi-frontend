import "../styles/MainPage.css";
import Navbar from "../components/Navbar.jsx";
import BookCard from "../components/BookCard";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import prevPageIcon from "../assets/prev_btn.png";
import nextPageIcon from "../assets/next_btn.png";
import { API_DOMAIN } from "../apis/api.js";

function MainPage() {
  const navigate = useNavigate();

  const [TopBooks, setTopBooks] = useState([]); // 추천 도서 상태 관리
  const [PopularBooks, setPopularBooks] = useState([]); // 좋아요 많은 도서 상태 관리
  const [page, setPage] = useState(0); // 추천 도서 페이지 번호
  const [popularityPage, setPopularityPage] = useState(0); // 좋아요 도서 페이지 번호
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수

  const childId = 1; // 예시로 childId=1 사용

  // 메인 페이지가 로드될 때 추천 도서 API를 호출하여 데이터 가져오기
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${API_DOMAIN}/main/books?page=${page}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ childId }), // childId를 요청 본문에 포함
        });

        const result = await response.json();

        setTopBooks(result.data.books); // 추천 도서 정보 저장
      } catch (error) {
        console.error("도서 정보를 가져오는 중 에러 발생:", error);
      }
    };

    fetchBooks();
  }, [page]); // page가 변경될 때마다 API 호출

  // 메인 페이지가 로드될 때 좋아요 순 도서 API를 호출하여 데이터 가져오기
  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
        const response = await fetch(
          `${API_DOMAIN}/main/popularity?page=${popularityPage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();
        setPopularBooks(result.data.books); // 좋아요 순 도서 정보 저장
        setTotalPages(result.data.totalPages); // 총 페이지 수 저장
      } catch (error) {
        console.error("좋아요 순 도서 정보를 가져오는 중 에러 발생:", error);
      }
    };

    fetchPopularBooks();
  }, [popularityPage]); // popularityPage가 변경될 때마다 API 호출

  // 추천 도서 페이지 변경 로직
  const changePage = (direction) => {
    if (direction === "next") {
      setPage((prevPage) => (prevPage + 1) % 2); // 다음 페이지로
    } else if (direction === "prev") {
      setPage((prevPage) => (prevPage + 1) % 2); // 이전 페이지로
    }
  };

  // 좋아요 순 도서 페이지 변경 로직
  const changePopularityPage = (direction) => {
    if (direction === "next" && popularityPage < totalPages - 1) {
      setPopularityPage((prevPopularityPage) => prevPopularityPage + 1); // 다음 페이지로
    } else if (direction === "prev" && popularityPage > 0) {
      setPopularityPage((prevPopularityPage) => prevPopularityPage - 1); // 이전 페이지로
    }
  };

  const handleSearch = (keyword) => {
    navigate(`/search?keyword=${keyword}`);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="content-container">
        {/* 추천 도서 Section */}
        <Section
          title="이런 책은 어때요?"
          books={TopBooks}
          changePage={changePage} // 추천 도서의 페이지 변경 로직
        />

        {/* 좋아요 순 도서 Section */}
        <Section
          title="친구들에게 인기있는 책 !"
          books={PopularBooks}
          changePage={changePopularityPage} // 좋아요 순 페이지 변경 함수 연결
          popularityPage={popularityPage} // 좋아요 페이지 정보 전달
          totalPages={totalPages} // 총 페이지 정보 전달
        />
      </div>
      <Footer />
    </>
  );
}

const Section = ({
  title,
  books = [],
  changePage,
  popularityPage,
  totalPages,
}) => {
  const navigate = useNavigate();

  // 도서 상세 페이지로 이동하는 함수
  const goToBookDetail = (bookId) => {
    navigate(`/book-detail/${bookId}`);
  };

  return (
    <>
      <div className="title">{title}</div>
      <div className="book-container">
        {/* 이전 버튼: popularityPage가 있을 때만 disabled 처리 */}
        <img
          className={`prev-button ${
            popularityPage !== undefined && popularityPage === 0
              ? "disabled"
              : ""
          }`}
          src={prevPageIcon}
          onClick={() => {
            if (popularityPage !== undefined) {
              popularityPage > 0 && changePage("prev"); // 좋아요 순 도서일 때
            } else {
              changePage("prev"); // 추천 도서일 때
            }
          }}
          alt="이전"
        />

        {books.length > 0 ? (
          books.map((book, index) => (
            <div
              key={index}
              className="book-item"
              onClick={() => goToBookDetail(book.id)} // 클릭하면 상세 페이지로 이동
            >
              <BookCard title={book.title} image={book.book_image} />
              <div className="book-title">{book.title}</div>
            </div>
          ))
        ) : (
          <div>도서 정보가 없습니다.</div> // books가 비어있을 경우 출력할 메시지
        )}

        {/* 다음 버튼: popularityPage와 totalPages가 있을 때만 disabled 처리 */}
        <img
          className={`next-button ${
            popularityPage !== undefined && popularityPage >= totalPages - 1
              ? "disabled"
              : ""
          }`}
          src={nextPageIcon}
          onClick={() => {
            if (popularityPage !== undefined) {
              popularityPage < totalPages - 1 && changePage("next"); // 좋아요 순 도서일 때
            } else {
              changePage("next"); // 추천 도서일 때
            }
          }}
          alt="다음"
        />
      </div>
    </>
  );
};

export default MainPage;
