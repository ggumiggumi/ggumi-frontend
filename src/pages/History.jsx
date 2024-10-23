import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios 추가
import '../styles/History.css';
import backgroundImage from '../assets/new-background.png';
import logoHistory from '../assets/logo-history.png';
import arrowLeft from '../assets/arrow-left.png';
import MBTIRecord from '../components/MBTIRecod';
import { API_DOMAIN } from '../apis/api.js';

const History = () => {
    const navigate = useNavigate();
    const [historyData, setHistoryData] = useState(null);

    // GET  /api/histories
    useEffect(() => {
        const fetchHistoryData = async () => {
            try {
                const response = await axios.get(`${API_DOMAIN}/histories`, {
                    withCredentials: true,
                });
                const data = response.data;
                setHistoryData(data);
            } catch (error) {
                const confirmNavigate = window.confirm(
                    '자녀의 MBTI 변화를 기록하고 싶다면 MBTI 검사를 진행해주세요. 현재 자녀의 MBTI 변화 기록이 없습니다!'
                );
                if (confirmNavigate) {
                    navigate('/mbti/survey');
                } else {
                    navigate(-1);
                }
            }
        };

        fetchHistoryData(); // 컴포넌트가 마운트될 때 호출
    }, [navigate]);

    // 뒤로가기 버튼 처리
    const handleBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    if (!historyData) {
        return (
            <div
                className='history-container'
                style={{ backgroundImage: `url(${backgroundImage})` }}
            ></div>
        );
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
                    {historyData.data.name} 아이의 MBTI 변화 기록
                </div>

                {/* 내용 상자 */}
                <div className='history-content-box'>
                    {/* 타임라인 세로줄 */}
                    <div className='timeline'></div>

                    {/* 좌측 MBTI 기록 리스트 */}
                    <div className='mbti-history'>
                        {historyData.data.histories.map((history, index) => (
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
                            src={`/profile-code${historyData.data.profileCode}.png`}
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
    const E =
        ei > 0.5
            ? `E: ${Math.round(100 * ei)}%`
            : `I: ${Math.round(100 * (1 - ei))}%`;
    const N =
        sn > 0.5
            ? `S: ${Math.round(100 * sn)}%`
            : `N: ${Math.round(100 * (1 - sn))}%`;
    const F =
        ft > 0.5
            ? `F: ${Math.round(100 * ft)}%`
            : `T: ${Math.round(100 * (1 - ft))}%`;
    const J =
        pj > 0.5
            ? `P: ${Math.round(100 * pj)}%`
            : `J: ${Math.round(100 * (1 - pj))}%`;

    return `${E} ${N} ${F} ${J}`;
};

export default History;
