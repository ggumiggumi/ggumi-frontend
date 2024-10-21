import React from "react";

function QuestionCard({ question, name, selectedValue, onChange, weights }) {
  const options = ["first", "second", "third", "fourth", "fifth"];

  return (
    <div className="question-container">
      <div className="question-box">
        <p className="question">{question}</p>
        <div className="circle-container">
          {options.map((option, index) => (
            <label className="circle-label" key={option}>
              <input
                type="radio"
                name={name}
                value={index}
                checked={selectedValue === index.toString()}
                onChange={onChange}
              />
              <span className={`${option}-circle`}></span>
              
            </label>
          ))}
        </div>
        <div className="reaction-buttons">
          <div className="reaction-button">좋아!</div>
          <div className="reaction-button">싫어!</div>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
