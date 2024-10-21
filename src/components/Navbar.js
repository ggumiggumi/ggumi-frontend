import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

import searchIcon from '../assets/search_btn.png'; // 검색 아이콘 경로
import profileIcon from '../assets/profile-code1.png'; // 프로필 아이콘 경로
import menuIcon from '../assets/menu_btn.png'; // 메뉴 아이콘 경로

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const handleMenuItemClick = () => {
        setIsMenuOpen(false); // 메뉴 닫기
    };

    // 다른 곳 클릭 시 메뉴 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest('.navbar-right')) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <div className="navbar">
            <div className="navbar-left">
                <div className="logo">꾸미</div>
                <form className="search-form">
                    <input type="text" placeholder=" 제목을 입력해봐요!" />
                    <img 
                        src={searchIcon} 
                        alt="검색" 
                        className="search-icon" 
                        onClick={() => { /* 검색 처리 로직 추가 */ }} 
                    />
                </form>
            </div>
            <div className="navbar-right">
                <img src={profileIcon} alt="프로필" className="profile-icon" />
                <img 
                    src={menuIcon} 
                    className="menu-icon" 
                    onClick={toggleMenu} 
                />
                {isMenuOpen && (
                    <div className="submenu">
                        <ul>
                            <li onClick={handleMenuItemClick}>프로필 관리</li>
                            <li onClick={handleMenuItemClick}>MBTI 검사</li>
                            <li onClick={handleMenuItemClick}>자녀성향 조회</li>
                            <li onClick={handleMenuItemClick}>히스토리 조회</li>
                            <li onClick={handleMenuItemClick}>로그아웃</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
