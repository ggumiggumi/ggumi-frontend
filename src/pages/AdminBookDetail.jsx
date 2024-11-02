import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'; // useParams import 추가
import { useNavigate } from 'react-router-dom'; // useNavigate import
import axios from 'axios';
import { API_DOMAIN } from "../apis/api";

import '../styles/AdminBookDetail.css';

const AdminBookDetail = () => {
    const { bookId } = useParams();  // URL의 bookId 값을 가져옴
    const navigate = useNavigate(); // useNavigate 훅 사용

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

    // Fetch book details on component mount
    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`${API_DOMAIN}/books/${bookId}`);
                const bookData = response.data.data;
    
                setFormData({
                    title: bookData.title,
                    author: bookData.author,
                    publisher: bookData.publisher,
                    recommend_age: bookData.recommend_age,
                    ei: bookData.ei,
                    sn: bookData.sn,
                    ft: bookData.ft,
                    pj: bookData.pj,
                    content: bookData.content,
                });
                setBookCover(bookData.book_image);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };
    
        // bookId가 존재할 때만 호출
        if (bookId) {
            fetchBookDetails();
        }
    }, [bookId]);

    // Handle form submission with axios
    const handleSubmit = async () => {
        const data = new FormData();

        // JSON 데이터를 FormData에 추가
        data.append(
            'requestDto',
            new Blob(
                [
                    JSON.stringify({
                        title: formData.title,
                        author: formData.author,
                        publisher: formData.publisher,
                        recommend_age: formData.recommend_age,
                        EI: formData.ei,
                        SN: formData.sn,
                        FT: formData.ft,
                        PJ: formData.pj,
                        content: formData.content,
                    }),
                ],
                { type: 'application/json' }
            )
        );

        // 파일을 추가하는 부분
        if (bookCover instanceof File) {
            data.append('imageFile', bookCover);
        } else {
            // bookCover가 URL인 경우 fetch를 사용하여 Blob으로 변환
            try {
                const response = await fetch(bookCover);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const blob = await response.blob();
                data.append('imageFile', blob, 'bookCover.jpg'); 
            } catch (error) {
                console.error('Error fetching book cover:', error);
            }
        }

        try {
            const response = await axios.put(`${API_DOMAIN}/books/${bookId}`, data);
            alert('도서 콘텐츠 수정이 완료되었습니다.');
            console.log('도서 콘텐츠 수정 성공:', response.data);
        } catch (error) {
            console.error('도서 콘텐츠 수정 실패:', error);
        }
    };

    

    // Trigger file input when upload button is clicked
    const handleUploadButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // 첫 번째 파일만 가져옴
        if (file) {
            console.log('Selected file:', file);
            // 미리보기용으로 상태 업데이트
            const reader = new FileReader();
            reader.onloadend = () => {
                setBookCover(reader.result); // 미리보기용으로 상태 업데이트
            };
            reader.readAsDataURL(file); // 파일을 데이터 URL로 읽음
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

    // 삭제하기 버튼 클릭 시 실행될 함수
    const handleDeleteClick = async () => {
        try {
            const response = await axios.delete(`${API_DOMAIN}/books/${bookId}`);
            alert(response.data.message); // 삭제 성공 메시지
            // 삭제 후 필요한 추가 동작 (예: 목록 새로 고침 등)
            navigate('/admin'); // '/book-list' 경로로 이동 (목록 화면의 경로로 설정)
        } catch (error) {
            console.error("삭제 실패:", error);
            alert("도서 정보 삭제에 실패하였습니다."); // 실패 메시지
        }
    };

    // 목록으로 버튼 클릭 시 실행될 함수
    const handleListClick = () => {
        //console.log("목록으로 버튼 클릭");
        // 목록 페이지로 이동 로직을 여기에 추가
        navigate('/admin'); // '/book-list' 경로로 이동 (목록 화면의 경로로 설정)
    };

    return (
        <div className='book-edit-page'>
            <div className='book-main-container'>
                <div className='book-info-container'>
                    <div className='book-cover-container'>
                        <div className='book-cover'>
                        {bookCover ? (
                                <img  className='book-cover'src={bookCover} alt='Book Cover' />
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
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }} // 숨김 처리
                            onChange={handleFileChange} // 파일 변경 핸들러 연결
                        />
                    </div>

                    <div className='book-detail-info-container'>
                        <div className='book-detail-info-section'>
                            <div className='book-detail-info-label'>제목</div>
                            <input className='book-detail-info-value' 
                                type='text'
                                name='title'
                                value={formData.title}
                                onChange={handleInputChange}></input>  
                        </div>

                        <div className='book-detail-info-section'>
                            <div className='book-detail-info-label'>작가</div>
                            <input className='book-detail-info-value' 
                                type='text'
                                name='author'
                                value={formData.author}
                                onChange={handleInputChange}></input>
                        </div>

                        <div className='book-detail-info-section'>
                            <div className='book-detail-info-label'>출판사</div>
                            <input className='book-detail-info-value' 
                                type='text'
                                name='publisher'
                                value={formData.publisher}
                                onChange={handleInputChange}></input>
                        </div>

                        <div className='book-detail-info-section'>
                            <div className='book-detail-info-label'>권장 연령</div>
                            <input
                                className='book-detail-info-value'
                                type='number'
                                name='recommend_age'
                                value={formData.recommend_age}
                                onChange={handleInputChange}
                            ></input>
                        </div>

                       {/* <div className='book-detail-info-section'>
                            <div className='book-detail-info-label'>MBTI</div>
                            <div className='book-detail-mbti-section'>
                                <div className='book-detail-mbti-info'>
                                    <div className='book-detail-mbti-label'>EI</div>
                                    <input
                                        className='book-detail-mbti-value'
                                        type='number'
                                        placeholder='EI'
                                        name='ei'
                                        value={formData.ei}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className='book-detail-mbti-info'>
                                    <div className='book-detail-mbti-label'>SN</div>
                                    <input
                                        className='book-detail-mbti-value'
                                        type='number'
                                        placeholder='SN'
                                        name='sn'
                                        value={formData.sn}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className='book-detail-mbti-info'>
                                    <div className='book-detail-mbti-label'>FT</div>
                                    <input
                                        className='book-detail-mbti-value'
                                        type='number'
                                        placeholder='FT'
                                        name='ft'
                                        value={formData.ft}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className='book-detail-mbti-info'>
                                    <div className='book-detail-mbti-label'>PJ</div>
                                    <input
                                        className='book-detail-mbti-value'
                                        type='number'
                                        placeholder='PJ'
                                        name='pj'
                                        value={formData.pj}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        */}

                        <div className='book-detail-info-section'>
                            <div className='book-detail-info-label'>줄거리</div>
                            <textarea
                                className='book-detail-info-value'
                                name='content'
                                value={formData.content}
                                onChange={handleInputChange}
                                rows={5}
                            />
                        </div>
                    </div>
                </div>

                <div className='book-detail-button-container'>
                    <button className='edit-button' onClick={handleSubmit}>수정하기</button>
                    <button className='book-delete-button' onClick={handleDeleteClick}>삭제하기</button>
                    <button className='list-button' onClick={handleListClick}>목록으로</button>
                </div>
            </div>
        </div>
    );
};

export default AdminBookDetail;
