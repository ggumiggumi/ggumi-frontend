import "../styles/MainPage.css";
import Navbar from "../components/Navbar.jsx";
import BookCard from "../components/BookCard";
import Footer from "../components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import prevPageIcon from "../assets/prev_btn.png";
import nextPageIcon from "../assets/next_btn.png";

function MainPage() {
  const navigate = useNavigate();
  const recommend_books = [
    {
      title: "진짜 진짜 슬퍼",
      image:
        "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791189922566.jpg",
    },
    {
      title: "행복해 행복해 나도 너도",
      image:
        "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791198774811.jpg",
    },
    {
      title: "날개는 없지만",
      image:
        "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788955827729.jpg",
    },
    {
      title: "기쁜 눈물",
      image:
        "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791198655707.jpg",
    },
    {
      title: "진짜 진짜 행복해",
      image:
        "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791189922535.jpg",
    },
    {
      title: "진짜 진짜 놀라워",
      image:
        "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791189922559.jpg",
    },
    {
      title: "네 기분은 어떤 색깔이니?",
      image:
        "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791158363925.jpg",
    },
    {
      title: "용기를 내, 비닐장갑!",
      image:
        "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791158362249.jpg",
    },
  ];

  const popular_books = [
    {
      title: "캐치티니핑 캐릭터도감",
      image:
        "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/8809854312855.jpg",
    },
    {
      title: "감정 호텔",
      image:
        "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791158364519.jpg",
    },
    {
      title: "몽글몽글 편의점",
      image:
        "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791158364823.jpg",
    },
    {
      title: "자개장 할머니",
      image:
        "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791193207956.jpg",
    },
    {
      title: "오늘, 너에게",
      image:
        "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788901287263.jpg",
    },
    {
      title: "꽁꽁꽁 댕댕",
      image:
        "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791158364724.jpg",
    },
    {
      title: "POP-UP 움직이는 달",
      image:
        "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/7070024001148.jpg",
    },
    {
      title: "달리고 조심해!",
      image:
        "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791190352642.jpg",
    },
  ];

  const itemsPerPage = 4;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPopularIndex, setCurrentPopularIndex] = useState(0);

  const changePage = (type, direction) => {
    if (type === "recommend") {
      setCurrentIndex((prevIndex) => {
        const newIndex =
          direction === "next"
            ? prevIndex + itemsPerPage
            : prevIndex - itemsPerPage;
        return Math.max(
          0,
          Math.min(newIndex, recommend_books.length - itemsPerPage)
        );
      });
    } else if (type === "popular") {
      setCurrentPopularIndex((prevIndex) => {
        const newIndex =
          direction === "next"
            ? prevIndex + itemsPerPage
            : prevIndex - itemsPerPage;
        return Math.max(
          0,
          Math.min(newIndex, popular_books.length - itemsPerPage)
        );
      });
    }
  };

  const handleSearch = (keyword) => {
    navigate(`/search?keyword=${keyword}`);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="content-container">
        <Section
          title="이런 책은 어때요?"
          books={recommend_books}
          currentIndex={currentIndex}
          changePage={changePage}
          type="recommend"
          itemsPerPage={itemsPerPage}
        />
        <Section
          title="친구들에게 인기있는 책"
          books={popular_books}
          currentIndex={currentPopularIndex}
          changePage={changePage}
          type="popular"
          itemsPerPage={itemsPerPage}
        />
      </div>
      <Footer />
    </>
  );
}

const Section = ({
  title,
  books,
  currentIndex,
  changePage,
  type,
  itemsPerPage,
}) => (
  <>
    <div className="title">{title}</div>
    <div className="book-container">
      <img
        className={`prev-button ${currentIndex === 0 ? "disabled" : ""}`}
        src={prevPageIcon}
        onClick={() => currentIndex > 0 && changePage(type, "prev")}
        alt="이전"
      />
      {books
        .slice(currentIndex, currentIndex + itemsPerPage)
        .map((book, index) => (
          <div key={index} className="book-item">
            <BookCard title={book.title} image={book.image} />
            <div className="book-title">{book.title}</div>
          </div>
        ))}
      <img
        className={`next-button ${
          currentIndex + itemsPerPage >= books.length ? "disabled" : ""
        }`}
        src={nextPageIcon}
        onClick={() =>
          currentIndex + itemsPerPage < books.length && changePage(type, "next")
        }
        alt="다음"
      />
    </div>
  </>
);

export default MainPage;
