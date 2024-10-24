import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import ProfileCard from '../components/ProfileCard';
import '../styles/ProfileSelection.css';
import backgroundImage from '../assets/background-yellow.png';
import addProfile from '../assets/add-profile.png';
import characterImage from '../assets/home-ggummi.png';
import { API_DOMAIN } from '../apis/api.js';

const ProfilesPage = () => {
    const [profiles, setProfiles] = useState([]);
    const navigate = useNavigate();

    const fetchProfiles = async () => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await axios.get(`${API_DOMAIN}/children/list`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            setProfiles(response.data.data);
        } catch (error) {
            console.error('프로필 목록을 가져오는 중 오류 발생:', error);
        }
    };

    useEffect(() => {
        fetchProfiles(); // 컴포넌트가 마운트될 때 프로필 정보 가져오기
    }, []);

    const handleSelectProfile = (id) => {
        Cookies.set('ChildId', id, { expires: 1 });
        navigate('/main');
    };

    const handleAddProfile = async () => {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const response = await axios.get(`${API_DOMAIN}/children/can-create`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            alert('자녀 프로필을 더 이상 생성할 수 없습니다.');
        }
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
                        profileImageCode={profile.profileCode}
                        name={profile.name}
                        onSelect={() => handleSelectProfile(profile.id)}
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

export default ProfilesPage;
