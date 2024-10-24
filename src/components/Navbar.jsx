import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

import searchIcon from "../assets/search_btn.png"; // 검색 아이콘 경로
import profileIcon from "../assets/profile-code1.png"; // 프로필 아이콘 경로
import menuIcon from "../assets/menu_btn.png"; // 메뉴 아이콘 경로

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleToProfileClick = () => {
    navigate(`/profiles`);
  };
  const handleToMBTIClick = () => {
    navigate(`/mbti/main`);
  };
  const handleToReadMBTIClick = () => {
    navigate(`/`);
  };
  const handleToHistoryClick = () => {
    navigate(`/history`);
  };
  const handleToLogoutClick = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate(`/login`);
  };

  const handleSearch = (e) => {
    e.preventDefault(); // 기본 폼 제출 방지
    if (onSearch) {
      onSearch(keyword); // 검색어를 부모 컴포넌트로 전달
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  const handleLogoClick = () => {
    navigate("/main"); // 로고 클릭 시 메인 페이지로 이동
  };

  // 다른 곳 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".navbar-right")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="navbar">
      <div className="navbar-left"></div>
      <div className="navbar-mid">
        <div
          className="logo"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          꾸미
        </div>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder=" 제목을 입력해봐요!"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <img
            src={searchIcon}
            alt="검색"
            className="search-icon"
            onClick={handleSearch}
          />
        </form>
      </div>
      <div className="navbar-right">
        <img src={profileIcon} alt="프로필" className="profile-icon" />
        <img src={menuIcon} className="menu-icon" onClick={toggleMenu} />
        {isMenuOpen && (
          <div className="submenu">
            <ul>
              <li onClick={handleToProfileClick}>프로필 관리</li>
              <li onClick={handleToMBTIClick}>MBTI 검사</li>
              <li onClick={handleToReadMBTIClick}>자녀성향 조회</li>
              <li onClick={handleToHistoryClick}>히스토리 조회</li>
              <li onClick={handleToLogoutClick}>로그아웃</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
