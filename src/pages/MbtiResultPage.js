import '../styles/MbtiResultPage.css';

import { useState } from 'react';

import profileIcon from "../assets/profile-code1.png";
import deleteBtn from '../assets/delete_btn.png';
import homeBtn from '../assets/home_btn.png';


function MbtiResultPage() {

    // mbti 점수 데이터
    const mbti_data = [
        { E: 12, I: 88 },
        { S: 73, N: 27 },
        { F: 53, T: 47 },
        { P: 50, J: 50 },
    ];

    const name = '홍길동';
    const mbtiType = 'INTJ';
    const mbtiDesc = '전략가';

    // 라벨 정보
    const mbti_labels = [
        { label: '마음', leftLabel: '외향형', rightLabel: '내향형' },
        { label: '에너지', leftLabel: '직관형', rightLabel: '현실주의형' },
        { label: '분석', leftLabel: '사고형', rightLabel: '감각형' },
        { label: '전술', leftLabel: '판단형', rightLabel: '인식형' },
    ];

    // MBTI 태그 정보
    const mbtiTags = ['#목표 지향적', '#논리적 사고', '#조용한 관찰자'];

    return (
        <div className="mbti-result-page">

            <div className="logo-section">꾸미</div>

            <div className="info-section">
                <div className="info-title">{name}의 성향 정보</div>

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
                                            width: `${mbti_data[index][Object.keys(mbti_data[index])[0]]}%`
                                        }}
                                    >
                                        <span className="percentage">{mbti_data[index][Object.keys(mbti_data[index])[0]]}%</span>
                                    </div>
                                    <div
                                        className="bar-right"
                                        style={{
                                            width: `${mbti_data[index][Object.keys(mbti_data[index])[1]]}%`
                                        }}
                                    >
                                        <span className="percentage">{mbti_data[index][Object.keys(mbti_data[index])[1]]}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        
            {/* 버튼 섹션 */}
            <div className="button-section">
                <img className="delete-button" src={deleteBtn} alt="삭제 버튼" />
                <img className="home-button" src={homeBtn} alt="홈 버튼" />
            </div>
           
        </div>
    );
}



export default MbtiResultPage;
