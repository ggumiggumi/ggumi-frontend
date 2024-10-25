import React, { useState } from 'react';
import '../styles/AddChild.css';
import backgroundImage from '../assets/new-background.png';

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

    const handleSelectProfile = (profile) => {
        setSelectedProfile(profile);
    };

    const handleCreateProfile = () => {

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
