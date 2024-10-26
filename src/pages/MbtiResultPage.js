import '../styles/MbtiResultPage.css';

import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { API_DOMAIN } from "../apis/api.js";

import profileIcon from "../assets/profile-code1.png";
import deleteBtn from '../assets/delete_btn.png';
import homeBtn from '../assets/home_btn.png';

function MbtiResultPage() {
    
    const navigate = useNavigate();

    const [childName, setChildName] = useState(''); // 아이 이름
    const [mbtiType, setMbtiType] = useState(''); // 자녀 mbti 유형
    const [mbtiDesc, setMbtiDesc] = useState(''); // 자녀 mbti 유형 설명
    const [mbtiTags, setMbtiTags] = useState([]); // 자녀 mbti 유형 태그 목록

    const [mbtiValues, setMbtiValues] = useState([
        { E: 0, I: 0 },
        { N: 0, S: 0 },
        { T: 0, F: 0 },
        { J: 0, P: 0 },
    ]); 
    
    useEffect(() => {
        const fetchChildMbti = async () => {
            try {
                const childId = sessionStorage.getItem('childId');

                if (!childId) {
                    console.error('childId가 존재하지 않습니다.');
                    return;
                }

                const response = await fetch(`${API_DOMAIN}/histories/my-child-mbti?childId=${childId}`, {
                    method: 'GET',
                    headers: {
                                'Content-Type': 'application/json',
                            },
                });
    
                const result = await response.json(); // JSON 데이터로 변환
    
                setChildName(result.data.name || '이름 없음');
                setMbtiType(result.data.mbtiType || '유형 없음');
                setMbtiDesc(result.data.mbtiDesc || '설명 없음');
                setMbtiTags(result.data.mbtiTags || ['태그1', '태그2', '태그3']);
    
                const updatedMbtiData = [
                    { E: result.data.e, I: result.data.i },
                    { N: result.data.n, S: result.data.s },
                    { T: result.data.t, F: result.data.f },
                    { J: result.data.j, P: result.data.p },
                ];
                setMbtiValues(updatedMbtiData); 
    
            } catch (error) {
                console.error("자녀 MBTI 검사 결과 가져오는 중 에러 발생:", error);
            } 
        };
    
        fetchChildMbti(); // 페이지 로드 시 함수 호출

    }, []); 
    
    const mbti_labels = [
        { label: '마음', leftLabel: '외향형(E)', rightLabel: '내향형(I)' },
        { label: '에너지', leftLabel: '직관형(N)', rightLabel: '현실주의형(S)' },
        { label: '분석', leftLabel: '사고형(T)', rightLabel: '감각형(F)' },
        { label: '전술', leftLabel: '판단형(J)', rightLabel: '인식형(P)' },
    ];

    const handleToMainPage = () => {
        navigate("/main");
    };

    const deleteRequest = () => {
        const isConfirmed = window.confirm('진단 데이터를 삭제하시겠습니까?');
        if (isConfirmed) {
            // 삭제 요청을 보내는 로직을 여기에 추가
            // 예시: await axios.delete('/api/delete-url');
            navigate("/main"); // 삭제 후 메인 페이지로 이동
        }
    };

    return (
        <div className="mbti-result-page">

            <div className="logo-section" onClick={handleToMainPage} style={{ cursor: "pointer" }}>꾸미</div>

            <div className="info-section">
                <div className="info-title">{childName}의 성향 정보</div>

                <div className="child-info-section">

                    <div className="profile-section">
                        <img className="profile-image" src={profileIcon} />
                        <div className="mbti-info">
                            <div className="mbti-type">{mbtiType} ({mbtiDesc})</div>
                            <div>
                                {mbtiTags.map((tag, index) => (
                                    <div className="mbti-tag" key={index}>{tag}</div>
                                ))}
                            </div>
                        </div>
                    </div>

                    
                    {/* MBTI 상세 정보 섹션 */}
                    <div className="mbti-detail-section">
                        {mbti_labels.map((item, index) => (
                            <div key={index}>
                                <div className="mbti-bar-label">
                                    <span className="left-label">{item.leftLabel}</span>
                                    <span className="center-label">{item.label}</span>
                                    <span className="right-label">{item.rightLabel}</span>
                                </div>
                                <div className="bar-container">
                                    <div
                                        className="bar-left"
                                        style={{
                                            width: `${mbtiValues[index][Object.keys(mbtiValues[index])[0]]}%`,
                                            backgroundColor: mbtiValues[index][Object.keys(mbtiValues[index])[0]] < mbtiValues[index][Object.keys(mbtiValues[index])[1]] ? 'gray' : '#34d399' // 작은 값은 회색, 큰 값은 #34d399
                                        }}
                                    >
                                        <span className="percentage">{mbtiValues[index][Object.keys(mbtiValues[index])[0]]}%</span>
                                    </div>
                                    <div
                                        className="bar-right"
                                        style={{
                                            width: `${mbtiValues[index][Object.keys(mbtiValues[index])[1]]}%`,
                                            backgroundColor: mbtiValues[index][Object.keys(mbtiValues[index])[1]] < mbtiValues[index][Object.keys(mbtiValues[index])[0]] ? 'gray' : '#34d399' // 작은 값은 회색, 큰 값은 #34d399  
                                        }}
                                    >
                                        <span className="percentage">{mbtiValues[index][Object.keys(mbtiValues[index])[1]]}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        
            {/* 버튼 섹션 */}
            <div className="button-section">
                <img className="delete-button" onClick={deleteRequest} src={deleteBtn} alt="삭제 버튼" />
                <img className="home-button" onClick={handleToMainPage} src={homeBtn} alt="홈 버튼" />
            </div>
           
        </div>
    );
}

export default MbtiResultPage;
