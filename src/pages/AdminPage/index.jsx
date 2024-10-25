import React, { useState } from 'react';
import backgroundImage from '../../assets/new-background.png';
import './styles/AdminPage.css'; // Importing the CSS file

const AdminPage = () => {
    const [bookCover, setBookCover] = useState(null);

    const handleBookCoverUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setBookCover(URL.createObjectURL(file));
        }
    };

    return (
        <div
            className='home-container'
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className='context-container'>
                <div className='book-info-container'>
                    {/* Book Cover Section */}
                    <div className='book-cover-input-container'>
                        <div className='book-cover'>
                            {bookCover ? (
                                <img src={bookCover} alt="Book Cover" />
                            ) : (
                                <div className='placeholder'>표지 이미지</div>
                            )}
                        </div>
                        <button className='upload-button'>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleBookCoverUpload}
                            />
                            표지 선택
                        </button>
                    </div>

                    {/* Book Info Input Section */}
                    <div className='book-details-container'>
                    <div className='book-detail'>
                            <label>제목</label>
                            <input type='text' />
                        </div>
                        <div className='book-detail'>
                            <label>작가</label>
                            <input type='text' />
                        </div>
                        <div className='book-detail'>
                            <label>출판사</label>
                            <input type='text' />
                        </div>
                        <div className='book-detail'>
                            <label>권장 연령</label>
                            <input type='number' />
                        </div>

                        {/* MBTI section */}
                        <div className='mbti-section'>
                            <label>MBTI</label>
                            <div className='mbti-options'>
                                <div className='mbti-input'>
                                    <input type='number' placeholder='EI' />
                                </div>
                                <div className='mbti-input'>
                                    <input type='number' placeholder='SN' />
                                </div>
                                <div className='mbti-input'>
                                    <input type='number' placeholder='FT' />
                                </div>
                                <div className='mbti-input'>
                                    <input type='number' placeholder='PJ' />
                                </div>
                            </div>
                        </div>

                        <div className='book-detail'>
                            <label>줄거리</label>
                            <textarea/>
                        </div>
                    </div>
                </div>

                {/* Add Book Button */}
                <button className='add-book-button'>도서 추가</button>
            </div>
        </div>
    );
};

export default AdminPage;
