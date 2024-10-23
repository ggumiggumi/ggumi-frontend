import React from 'react';
import '../styles/ProfileCard.css';

const ProfileCard = ({ profileImageCode, name, onSelect }) => {
    return (
        <div className='profile-card' onClick={onSelect}>
            <button className='profile-button'>
                <img
                    src={`/profile-code${profileImageCode}.png`}
                    alt={name}
                    className='profile-image'
                />
            </button>
            <p>{name}</p>
        </div>
    );
};

export default ProfileCard;
