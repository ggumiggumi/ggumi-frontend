import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import '../styles/ProfileSelection.css';
import backgroundImage from '../assets/background-yellow.png';
import addProfile from '../assets/add-profile.png';
import characterImage from '../assets/home-ggummi.png';

// 임의 프로필 데이터 추가 (추후 데이터 받아서 처리로 변경)
const profiles = [
    { id: 1, name: 'John Doe', imageCode: 1 },
    { id: 2, name: 'Jane Smith', imageCode: 2 },
    { id: 3, name: 'Jane Smith', imageCode: 3 },
];

const Home = () => {
    const navigate = useNavigate();
    const handleSelectProfile = (name) => {
        // 프로필 선택 처리 로직
        console.log(`${name} 선택됨`);
    };

    const handleAddProfile = () => {
        // 프로필 추가 처리 로직
        console.log('프로필 추가 버튼 클릭됨');
        navigate('/add-child'); 
    };

    return (
        <div
            className='home-container'
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className='title'>꾸미와 함께 독서를 즐겨봐요</div>
            <div className='profile-selection'>
                {profiles.map((profile) => (
                    <ProfileCard
                        key={profile.id}
                        profileImageCode={profile.imageCode}
                        name={profile.name}
                        onSelect={() => handleSelectProfile(profile.name)}
                    />
                ))}
                <div className='add-profile-card' onClick={handleAddProfile}>
                    <button className='add-profile-button'>
                        <img
                            src={addProfile}
                            alt='add button'
                            className='add-profile-image'
                        />
                    </button>
                    <p>새 프로필</p>
                </div>
            </div>
            <div className='brand-character-container'>
                <img
                    src={characterImage}
                    alt='Brand Character'
                    className='brand-character'
                />
            </div>
        </div>
    );
};

export default Home;
