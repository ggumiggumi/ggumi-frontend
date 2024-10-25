import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AddChild.css';
import backgroundImage from '../assets/new-background.png';
import { API_DOMAIN } from '../apis/api.js';

const profiles = [
    { id: 1, name: '무너' },
    { id: 2, name: '홀맨' },
    { id: 3, name: '아리' },
];

const AddChild = () => {
    const [selectedProfile, setSelectedProfile] = useState(profiles[0]);
    const [name, setName] = useState('');
    const [gender, setGender] = useState('남아');
    const [birthdate, setBirthdate] = useState('');
    const navigate = useNavigate();

    const handleSelectProfile = (profile) => {
        setSelectedProfile(profile);
    };

    const handleCreateProfile = async () => {
        
        if (!name.trim()) {
            alert('이름을 입력해주세요.');
            return;
        }
        if (!birthdate) {
            alert('생년월일을 입력해주세요.');
            return;
        }
    
        const accessToken = localStorage.getItem('accessToken');
        try {
            // 생년월일을 서버에서 요구하는 형식으로 변환 (예: "YYYY-MM-DD")
            const formattedBirthdate = new Date(birthdate)
                .toISOString()
                .split('T')[0];

            // 프로필 데이터를 백엔드로 전송
            const response = await axios.post(
                `${API_DOMAIN}/children`, {
                    name: name,
                    birthday: formattedBirthdate,
                    profileCode: selectedProfile.id,
                    gender: gender === '남아' ? 'MALE' : 'FEMALE', // 백엔드에서 기대하는 `Gender` 값에 맞추기
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            alert('자녀 프로필이 성공적으로 생성되었습니다.');
            navigate('/profiles');
        } catch (error) {
            alert('프로필 생성에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div
            className='home-container'
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className='profile-creation-container'>
                <h2>자녀의 프로필을 만들어주세요!</h2>
                <div className='profile-creation-mid'>
                    <div className='profile-creation-mid-left'>
                        <div className='profile-image-display'>
                            {selectedProfile ? (
                                <img
                                    src={`/profile-code${selectedProfile.id}.png`}
                                    alt={selectedProfile.name}
                                />
                            ) : (
                                <img
                                    src='/profile-code1.png'
                                    alt='select'
                                ></img>
                            )}
                        </div>
                        <div className='profile-image-options'>
                            {profiles.map((profile) => (
                                <div
                                    key={profile.id}
                                    className='profile-option'
                                    onClick={() => handleSelectProfile(profile)}
                                >
                                    <input
                                        type='radio'
                                        id={`profile-${profile.id}`}
                                        name='profile'
                                        checked={
                                            selectedProfile.id === profile.id
                                        }
                                        onChange={() =>
                                            handleSelectProfile(profile)
                                        }
                                    />
                                    <label htmlFor={`profile-${profile.id}`}>
                                        <img
                                            src={`profile-code${profile.id}.png`}
                                            alt={profile.name}
                                        />
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='profile-creation-mid-right'>
                        <div className='input-group'>
                            <label htmlFor='name'>이름</label>
                            <input
                                type='text'
                                id='name'
                                placeholder='이름'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='input-group'>
                            <label>성별</label>
                            <div className='gender-options'>
                                <div className='gender-option'>
                                    <input
                                        type='radio'
                                        id='male'
                                        name='gender'
                                        value='남아'
                                        checked={gender === '남아'}
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                    />
                                    <label htmlFor='male'>남아</label>
                                </div>
                                <div className='gender-option'>
                                    <input
                                        type='radio'
                                        id='female'
                                        name='gender'
                                        value='여아'
                                        checked={gender === '여아'}
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                    />
                                    <label htmlFor='female'>여아</label>
                                </div>
                            </div>
                        </div>
                        <div className='input-group'>
                            <label htmlFor='birthdate'>생년월일</label>
                            <input
                                type='date'
                                id='birthdate'
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <button className='create-button' onClick={handleCreateProfile}>
                    생성
                </button>
            </div>
        </div>
    );
};

export default AddChild;
