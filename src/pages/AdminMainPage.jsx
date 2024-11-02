import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_DOMAIN } from "../apis/api";

import '../styles/AdminMainPage.css';

const AdminMainPage = () => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();
    const pageSize = 10;

    const fetchBooks = async (page = 0) => {
        try {
            const response = await axios.get(`${API_DOMAIN}/books/list?page=${page}`);
            const { data } = response.data;
      
            setBooks(data.books);
            setCurrentPage(data.number);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("도서 목록을 불러오는 중 오류가 발생했습니다:", error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            fetchBooks(newPage);
        }
    };

    const handleAddBookClick = () => {
        navigate('/admin/add-book'); // 도서 등록 페이지로 이동
    };

    // 책 상세 페이지로 이동하는 함수
    const goToBookDetail = (bookId) => {
        navigate(`/admin/book-detail/${bookId}`);
    };

    return (
        <div className="admin-main-container">

            <div className='title'>도서 콘텐츠 관리자 페이지</div>
            <table id="customers">
                <thead>
                    <tr>
                        <th>책 ID</th>
                        <th>책 제목</th>
                        <th>저자</th>
                        <th>출판사</th>
                        <th>권장 연령</th>
                        <th>EI</th>
                        <th>SN</th>
                        <th>FT</th>
                        <th>PJ</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id} onClick={() => goToBookDetail(book.id)} style={{ cursor: 'pointer' }}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.publisher}</td>
                            <td>{book.recommend_age}세</td>
                            <td>{book.ei}</td>
                            <td>{book.sn}</td>
                            <td>{book.ft}</td>
                            <td>{book.pj}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 추가 버튼 */}
            <div className="admin-button-container">
                <button className='book-add-button' onClick={handleAddBookClick}>도서 콘텐츠 등록</button>
            </div>

            <div className="pagination-container">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                    이전 페이지
                </button>
                <span>{currentPage + 1} / {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
                    다음 페이지
                </button>
            </div>
            
                               

        </div>
    );
};

export default AdminMainPage;
