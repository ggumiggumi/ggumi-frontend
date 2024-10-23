import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer";
import BookItem from "../../components/BookItem";
import backgroundImage from "../../assets/background-yellow.png";
import axios from "axios";
import "./styles/Search.css";
import { API_DOMAIN } from "../../apis/api.js";

const Search = () => {
  const [books, setBooks] = useState([]);
  const [keyword, setKeyword] = useState("");
  const location = useLocation(); // 현재 위치 정보 가져오기s

  const fetchBooks = async (keyword) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `${API_DOMAIN}/books/search?keyword=${keyword}`,
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBooks(response.data.data.searchResultList); // 검색 결과 저장
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const keywordFromQuery = query.get("keyword");

    if (keywordFromQuery) {
      setKeyword(keywordFromQuery); // 쿼리에서 검색어 저장
      fetchBooks(keywordFromQuery); // 쿼리에서 검색어 가져와서 검색
    }
  }, [location.search]);

  const handleSearch = (newKeyword) => {
    setKeyword(newKeyword); // 새로운 검색어 상태 업데이트
    fetchBooks(newKeyword); // 새로운 검색어로 API 호출
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div
        className="background-container"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="searched-book-container">
          <h2 className="result-message">
            <span style={{ color: "#FF4A4A" }}>'{keyword}'</span> 검색 결과 총{" "}
            <strong>{books.length}</strong>건
          </h2>
          <div className="book-list">
            {books.length === 0 ? (
              <div className="no-results">결과가 없습니다.</div> // 결과가 없을 때 메시지 표시
            ) : (
              <div className="book-list">
                {books.map((book, index) => (
                  <BookItem
                    book={{
                      title: book.title,
                      author: book.author,
                      publisher: book.publisher,
                      date: new Date(book.createdAt).toLocaleDateString(), // 날짜 포맷팅
                      image: book.bookImage,
                    }}
                    key={index}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Search;
