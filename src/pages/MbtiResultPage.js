import '../styles/MbtiResultPage.css';

import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { API_DOMAIN } from "../apis/api.js";

import backgroundImage from "../assets/new-background.png"; // 배경 이미지 경로 


function MbtiResultPage() {
    
    const navigate = useNavigate();

    const [childName, setChildName] = useState(''); // 아이 이름
    const [mbtiType, setMbtiType] = useState(''); // 자녀 mbti 유형
    const [mbtiDesc, setMbtiDesc] = useState(''); // 자녀 mbti 유형 설명
    const [mbtiTags, setMbtiTags] = useState([]); // 자녀 mbti 유형 태그 목록
    const [profileCode, setProfileCode] = useState('');

    const [mbtiValues, setMbtiValues] = useState([
        { E: 0, I: 0 },
        { N: 0, S: 0 },
        { T: 0, F: 0 },
        { J: 0, P: 0 },
    ]); 

    const [mbtiColors, setMbtiColors] = useState([
        { E: 'gray', I: 'gray' },
        { N: 'gray', S: 'gray' },
        { T: 'gray', F: 'gray' },
        { J: 'gray', P: 'gray' },
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
                setProfileCode(result.data.profileCode || 1);
    
                const updatedMbtiData = [
                    { E: result.data.e, I: result.data.i },
                    { N: result.data.n, S: result.data.s },
                    { T: result.data.t, F: result.data.f },
                    { J: result.data.j, P: result.data.p },
                ];

                setMbtiValues(updatedMbtiData); 

                // MBTI 색상 설정
                setMbtiColors(getMbtiColors(result.data.mbtiType));
    
            } catch (error) {
                console.error("자녀 MBTI 검사 결과 가져오는 중 에러 발생:", error);

                const confirmNavigate = window.confirm(
                    '자녀의 MBTI 결과를 확인하고 싶다면 MBTI 검사를 진행해주세요. 현재 자녀의 MBTI 검사 기록이 없습니다!'
                );
                if (confirmNavigate) {
                    navigate('/mbti/main');
                } else {
                    navigate(-1);
                }
            } 
        };
    
        fetchChildMbti(); // 페이지 로드 시 함수 호출

    }, []); 


    const getMbtiColors = (type) => {
        const colors = [
            { E: 'gray', I: 'gray' },
            { N: 'gray', S: 'gray' },
            { T: 'gray', F: 'gray' },
            { J: 'gray', P: 'gray' },
        ];

        if (type) {
            for (let i = 0; i < type.length; i++) {
                if (type[i] === 'I') colors[0].I = '#34d399'; // 초록색
                if (type[i] === 'E') colors[0].E = '#34d399'; // 초록색
                if (type[i] === 'N') colors[1].N = '#34d399'; // 초록색
                if (type[i] === 'S') colors[1].S = '#34d399'; // 초록색
                if (type[i] === 'T') colors[2].T = '#34d399'; // 초록색
                if (type[i] === 'F') colors[2].F = '#34d399'; // 초록색
                if (type[i] === 'J') colors[3].J = '#34d399'; // 초록색
                if (type[i] === 'P') colors[3].P = '#34d399'; // 초록색
            }
        }

        return colors;
    };
    
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

    if (!mbtiType) {
        return (
            <div className="mbti-result-page" style={{ backgroundImage: `url(${backgroundImage})` }}/>
        );
    }

    return (
        <div className="mbti-result-page" style={{ backgroundImage: `url(${backgroundImage})` }}>


            <div className="logo-container">
                {/**<img src={heartSticker} alt="꾸미 로고" className="heart-logo" />**/}
                <div className="logo-title" onClick={handleToMainPage} style={{ cursor: "pointer" }} >꾸미</div>
            </div>
            
            <div className="mbti-info-container">

                <div className="mbti-info-section">
                    
                    <div className="mbti-info-title">{childName}의 성향 정보</div>

                    <div className="child-info-section">

                        <div className="profile-section">
                            <img className="profile-image" src={`/profile-code${profileCode}.png`} alt='Profile'/>

                            <div className="mbti-info">
                                <div className="mbti-type">{mbtiType} ({mbtiDesc})</div>
                                <div>
                                    {mbtiTags.map((tag, index) => (
                                        <div className="mbti-tag" key={index}>{tag}</div>
                                    ))}
                                </div>
                            </div>
                         </div>

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
                                            backgroundColor: mbtiColors[index][Object.keys(mbtiValues[index])[0]], // 해당 색상 적용
                                        }}
                                        >
                                            <span className="percentage">{mbtiValues[index][Object.keys(mbtiValues[index])[0]]}%</span>
                                        </div>
                                        <div
                                        className="bar-right"
                                        style={{
                                            width: `${mbtiValues[index][Object.keys(mbtiValues[index])[1]]}%`,
                                            backgroundColor: mbtiColors[index][Object.keys(mbtiValues[index])[1]], // 해당 색상 적용
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

            </div>
            

            {/* 버튼 섹션 */}
            <div className="button-container">
                
                <div className="delete-button" onClick={deleteRequest}>
                    진단 정보 삭제
                </div>

                <div className="home-button" onClick={handleToMainPage}>
                    홈으로 이동
                </div>

            </div>

           
        </div>
    );
}

export default MbtiResultPage;
