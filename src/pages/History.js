import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/History.css';
import backgroundImage from '../assets/new-background.png';
import logoHistory from '../assets/logo-history.png';
import arrowLeft from '../assets/arrow-left.png';
// import MBTIRecord from '../components/MBTIRecord'; // 새로 생성한 컴포넌트 가져오기
import MBTIRecord from '../components/MBTIRecod';

const History = () => {
    const navigate = useNavigate();
    // const [historyData, setHistoryData] = useState(null);

    // // 서버에서 데이터 가져오기
    // useEffect(() => {
    //     const fetchHistoryData = async () => {
    //         try {
    //             const response = await fetch('/api/history'); // API 주소는 상황에 맞게 수정
    //             const data = await response.json();
    //             setHistoryData(data);
    //         } catch (error) {
    //             console.error('Failed to fetch history data:', error);
    //         }
    //     };

    //     fetchHistoryData();
    // }, []);

    // 샘플 데이터 직접 삽입
    const [historyData] = useState({
        name: '정희진',
        profileCode: 1,
        histories: [
            {
                createdAt: '2024-10-18T19:09:35',
                ei: 0.6,
                sn: 1.0,
                ft: 1.0,
                pj: 1.0,
            },
            {
                createdAt: '2024-08-22T19:09:35',
                ei: 1.0,
                sn: 1.0,
                ft: 1.0,
                pj: 1.0,
            },
            {
                createdAt: '2024-08-03T19:09:35',
                ei: 1.0,
                sn: 1.0,
                ft: 1.0,
                pj: 1.0,
            },
            {
                createdAt: '2024-07-18T19:09:35',
                ei: 1.0,
                sn: 1.0,
                ft: 1.0,
                pj: 1.0,
            },
            {
                createdAt: '2024-07-18T19:09:35',
                ei: 1.0,
                sn: 1.0,
                ft: 1.0,
                pj: 1.0,
            },
            {
                createdAt: '2024-07-18T19:09:35',
                ei: 1.0,
                sn: 1.0,
                ft: 1.0,
                pj: 1.0,
            },
            {
                createdAt: '2024-07-18T19:09:35',
                ei: 1.0,
                sn: 1.0,
                ft: 1.0,
                pj: 1.0,
            },
        ],
    });

    // 뒤로가기 버튼 처리
    const handleBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    if (!historyData) {
        return <div>Loading...</div>; // 데이터 로딩 중 처리
    }

    return (
        <div
            className='history-container'
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            {/* 좌측 상단 로고 이미지 */}
            <div className='history-logo-container'>
                <img src={logoHistory} alt='Logo' />
            </div>
    
            {/* 메인 컨텐츠 박스 */}
            <div className='history-main-content'>
                {/* 뒤로가기 버튼 */}
                <img
                    className='history-back-button'
                    src={arrowLeft}
                    alt='Back'
                    onClick={handleBack}
                />
    
                {/* 메인 제목 */}
                <div className='history-title'>
                    {historyData.name} 아이의 MBTI 변화 기록
                </div>
    
                {/* 내용 상자 */}
                <div className='history-content-box'>
                    {/* 타임라인 세로줄 */}
                    <div className='timeline'></div>
    
                    {/* 좌측 MBTI 기록 리스트 */}
                    <div className='mbti-history'>
                        {historyData.histories.map((history, index) => (
                            <MBTIRecord
                                key={index}
                                year={history.createdAt.slice(0, 4)}
                                month={history.createdAt.slice(5, 7)}
                                week={Math.ceil(
                                    new Date(history.createdAt).getDate() / 7
                                )}
                                type={`${getMBTIType(
                                    history.ei,
                                    history.sn,
                                    history.ft,
                                    history.pj
                                )}`}
                                percentages={getPercentageDisplay(
                                    history.ei,
                                    history.sn,
                                    history.ft,
                                    history.pj
                                )}
                            />
                        ))}
                    </div>
    
                    {/* 우측 프로필 이미지 */}
                    <div className='history-profile-image'>
                        <img
                            src={`/profile-code${historyData.profileCode}.png`}
                            alt='Profile'
                        />
                    </div>
                </div>
            </div>
        </div>
    );    
};

// MBTI 타입을 결정하는 함수 (예시)
const getMBTIType = (ei, sn, ft, pj) => {
    const EorI = ei > 0.5 ? 'E' : 'I';
    const SorN = sn > 0.5 ? 'N' : 'S';
    const ForT = ft > 0.5 ? 'F' : 'T';
    const PorJ = pj > 0.5 ? 'J' : 'P';

    return `${EorI}${SorN}${ForT}${PorJ}`;
};

// 백분율 표기 함수
const getPercentageDisplay = (ei, sn, ft, pj) => {
    const E = ei > 0.5 ? `E: ${100 * ei}%` : `I: ${100 * (1 - ei)}%`;
    const N = sn > 0.5 ? `S: ${100 * sn}%` : `N: ${100 * (1 - sn)}%`;
    const F = ft > 0.5 ? `F: ${100 * ft}%` : `T: ${100 * (1 - ft)}%`;
    const J = pj > 0.5 ? `P: ${100 * pj}%` : `J: ${100 * (1 - pj)}%`;

    return `${E} ${N} ${F} ${J}`;
};

export default History;
