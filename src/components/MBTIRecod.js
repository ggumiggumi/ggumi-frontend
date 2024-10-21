// MBTIRecord.js
import React from 'react';

const MBTIRecord = ({ year, month, week, type, percentages }) => {
    return (
        <div className='mbti-record'>
            <div>{`${year}.${month}.${week}주차`}</div>
            <div>{type}</div>
            <div>{percentages}</div>
        </div>
    );
};

export default MBTIRecord;
