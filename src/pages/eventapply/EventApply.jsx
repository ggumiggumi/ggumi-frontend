import React, { useEffect, useState } from "react";
import backgroundImage from "../../assets/event-background.png";
import evnetBooksImage from "../../assets/event-books.png";
import axios from "axios";
import "./styles/EventApply.css";
import { API_DOMAIN } from "../../apis/api.js";

const EventApply = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [checked, setChecked] = useState(false);
  const [isEventTime, setIsEventTime] = useState(false);

  const checkEventTime = () => {
    const now = new Date();
    const startHour = 12;
    const endHour = 18;
    const startMinute = 0;
    const endMinute = 0;

    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if (
      (currentHour > startHour ||
        (currentHour === startHour && currentMinute >= startMinute)) &&
      (currentHour < endHour ||
        (currentHour === endHour && currentMinute <= endMinute))
    ) {
      setIsEventTime(true);
    } else {
      setIsEventTime(false);
    }
  };

  useEffect(() => {
    checkEventTime();
    const interval = setInterval(checkEventTime, 60000); // 1분마다 이벤트 시간 확인
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleCheckboxClick = () => {
    setChecked(!checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEventTime) {
      alert("이벤트 참여 기간이 아닙니다."); // 이벤트 시간 외에 클릭 시 메시지
      return;
    }
    if (!name) {
      alert("이름을 입력해주세요.");
      return;
    }

    if (!phone) {
      alert("전화번호를 입력해주세요.");
      return;
    }

    if (!checked) {
      alert("필수 항목에 동의해주세요.");
      return;
    }

    const data = {
      name,
      phoneNumber: phone,
      applyTime: Date.now(), // 현재 시간 (ms 단위)
    };

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(`${API_DOMAIN}/apply/ver5`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      alert("이벤트 참여가 완료되었습니다!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("이벤트 참여를 실패했습니다:", error);
      alert("이벤트 참여에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div
      className="apply-background-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="apply-title-container">
        <div className="apply-sub-title">
          선착순 10분에게 드리는 특별한 혜택
        </div>
        <div className="apply-title">선착순 도서 선물 이벤트!!</div>
      </div>

      <div className="apply-content-container">
        <div className="guide-container">
          <div className="period-container">
            <div className="entry-button">
              <div className="entry">응모기간</div>
            </div>
            <div className="explanation">
              매일 오후 1시 ~ 1시 10분 (10분 간)
            </div>
          </div>
          <div className="result-announcement-container">
            <div className="entry-button">
              <div className="entry">당첨자 발표</div>
            </div>
            <div className="explanation">명일 오후 1시 문자발송</div>
          </div>
          <div
            className="event-books-container"
            style={{ backgroundImage: `url(${evnetBooksImage})` }}
          />
        </div>

        <div className="info-container">
          <div className="info-title">응모 정보 입력</div>
          <div className="info-subtitle">이벤트에 참여하시려면</div>
          <div className="info-subtitle">아래 정보를 입력해주세요</div>
          <input
            type="text"
            className="name-input-box"
            value={name}
            placeholder="이름을 입력해주세요."
            onChange={handleNameChange}
          />
          <input
            type="text"
            className="phone-input-box"
            value={phone}
            placeholder="전화번호를 입력해주세요.(010-xxxx~)"
            onChange={handlePhoneChange}
          />
          <div className="agree-container">
            <div
              className={`agree-box ${checked ? "checked" : ""}`}
              onClick={handleCheckboxClick}
            />
            <div className="agree-comment">
              <span className="agree-test">[필수]개인정보 수집 이용</span>
              <span className="agree-yes">에 동의합니다.</span>
            </div>
          </div>
          <button className="event-participation-button" onClick={handleSubmit}>
            이벤트 참여하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventApply;
