import React from 'react';
import '../styles/ProfileCard.css';
import profile1 from '../assets/profile-code1.png';
import profile2 from '../assets/profile-code2.png';
import profile3 from '../assets/profile-code3.png';

const ProfileCard = ({ profileImageCode, name, onSelect }) => {
    let profileImage;

    // profileImageCode에 따라 이미지 선택
    switch (profileImageCode) {
        case 1:
            profileImage = profile1;
            break;
        case 2:
            profileImage = profile2;
            break;
        case 3:
            profileImage = profile3;
            break;
        default:
            profileImage = profile1; // 기본 이미지 설정 (필요에 따라 변경)
            break;
    }

    return (
        <div className='profile-card' onClick={onSelect}>
             <button className='profile-button'>
                <img src={profileImage} alt={name} className='profile-image' />
            </button>
            <p>{name}</p>
        </div>
    );
};

export default ProfileCard;
