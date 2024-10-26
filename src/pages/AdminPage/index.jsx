import React, { useState, useRef } from 'react';
import axios from 'axios';
import backgroundImage from '../../assets/new-background.png';
import { API_DOMAIN, LOCAL_DOMAIN } from '../../apis/api.js';
import './styles/AdminPage.css';

const AdminPage = () => {
    const [bookCover, setBookCover] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        publisher: '',
        recommend_age: '',
        ei: '',
        sn: '',
        ft: '',
        pj: '',
        content: '',
    });
    const fileInputRef = useRef(null);

    // Handle file upload
    const handleBookCoverUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setBookCover(URL.createObjectURL(file));
            setFormData((prevData) => ({
                ...prevData,
                bookCover: file,
            }));
        }
    };

    // Handle form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Trigger file input when upload button is clicked
    const handleUploadButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Handle form submission with axios
    const handleSubmit = async () => {
        const data = new FormData();

        // JSON.stringify를 사용하여 requestDto JSON 데이터를 추가
        data.append(
            'requestDto',
            new Blob(
                [
                    JSON.stringify({
                        title: formData.title,
                        author: formData.author,
                        publisher: formData.publisher,
                        recommend_age: formData.recommend_age,
                        ei: formData.ei,
                        sn: formData.sn,
                        ft: formData.ft,
                        pj: formData.pj,
                        content: formData.content,
                    }),
                ],
                { type: 'application/json' }
            )
        );

        data.append('imageFile', formData.bookCover);

        try {
            const response = await axios.post(
                // `${API_DOMAIN}/books`,
                `${LOCAL_DOMAIN}/api/books`,
                data
            );
            console.log('Book added successfully:', response.data);
        } catch (error) {
            console.error('Error adding book:', error);
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
                                <img src={bookCover} alt='Book Cover' />
                            ) : (
                                <div className='placeholder'>표지 이미지</div>
                            )}
                        </div>
                        <button
                            className='upload-button'
                            onClick={handleUploadButtonClick}
                        >
                            파일 선택
                        </button>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={handleBookCoverUpload}
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                        />
                    </div>

                    {/* Book Info Input Section */}
                    <div className='book-details-container'>
                        <div className='book-detail'>
                            <label>제목</label>
                            <input
                                type='text'
                                name='title'
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='book-detail'>
                            <label>작가</label>
                            <input
                                type='text'
                                name='author'
                                value={formData.author}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='book-detail'>
                            <label>출판사</label>
                            <input
                                type='text'
                                name='publisher'
                                value={formData.publisher}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='book-detail'>
                            <label>권장 연령</label>
                            <input
                                type='number'
                                name='recommend_age'
                                value={formData.recommend_age}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* MBTI section */}
                        <div className='mbti-section'>
                            <label>MBTI</label>
                            <div className='mbti-options'>
                                <div className='mbti-input'>
                                    <input
                                        type='number'
                                        placeholder='EI'
                                        name='ei'
                                        value={formData.ei}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mbti-input'>
                                    <input
                                        type='number'
                                        placeholder='SN'
                                        name='sn'
                                        value={formData.sn}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mbti-input'>
                                    <input
                                        type='number'
                                        placeholder='FT'
                                        name='ft'
                                        value={formData.ft}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mbti-input'>
                                    <input
                                        type='number'
                                        placeholder='PJ'
                                        name='pj'
                                        value={formData.pj}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='book-detail'>
                            <label>줄거리</label>
                            <textarea
                                name='content'
                                value={formData.content}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Add Book Button */}
                <button className='add-book-button' onClick={handleSubmit}>
                    도서 추가
                </button>
            </div>
        </div>
    );
};

export default AdminPage;
