import React, { useEffect, useState } from "react";
import backgroundImage from "../../assets/event-background.png";
import axios from "axios";
import "./styles/EventResult.css";
import { API_DOMAIN } from "../../apis/api.js";

const EventResult = () => {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(`${API_DOMAIN}/event/winners`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setWinners(response.data);
      } catch (error) {
        console.error(
          "당첨자 데이터를 가져오는 데 오류가 발생했습니다:",
          error
        );
      }
    };

    const mockWinners = [
      { name: "고경남", phoneNumber: "010-1234-5678" },
      { name: "김영희", phoneNumber: "010-2345-6789" },
      { name: "이철수", phoneNumber: "010-3456-7890" },
      { name: "박지민", phoneNumber: "010-4567-8901" },
      { name: "최현우", phoneNumber: "010-5678-9012" },
      { name: "이영희", phoneNumber: "010-6789-0123" },
      { name: "강철수", phoneNumber: "010-7890-1234" },
      { name: "김민지", phoneNumber: "010-8901-2345" },
      { name: "최민수", phoneNumber: "010-9012-3456" },
      { name: "홍길동", phoneNumber: "010-0123-4567" },
      { name: "이순신", phoneNumber: "010-3456-7890" },
      { name: "고경남", phoneNumber: "010-1234-5678" },
      { name: "김영희", phoneNumber: "010-2345-6789" },
      { name: "이철수", phoneNumber: "010-3456-7890" },
      { name: "박지민", phoneNumber: "010-4567-8901" },
      { name: "최현우", phoneNumber: "010-5678-9012" },
      { name: "이영희", phoneNumber: "010-6789-0123" },
      { name: "강철수", phoneNumber: "010-7890-1234" },
      { name: "김민지", phoneNumber: "010-8901-2345" },
      { name: "최민수", phoneNumber: "010-9012-3456" },
      { name: "홍길동", phoneNumber: "010-0123-4567" },
      { name: "이순신", phoneNumber: "010-3456-7890" },
      { name: "고경남", phoneNumber: "010-1234-5678" },
      { name: "김영희", phoneNumber: "010-2345-6789" },
      { name: "이철수", phoneNumber: "010-3456-7890" },
      { name: "박지민", phoneNumber: "010-4567-8901" },
      { name: "최현우", phoneNumber: "010-5678-9012" },
      { name: "이영희", phoneNumber: "010-6789-0123" },
      { name: "강철수", phoneNumber: "010-7890-1234" },
      { name: "김민지", phoneNumber: "010-8901-2345" },
      { name: "최민수", phoneNumber: "010-9012-3456" },
      { name: "홍길동", phoneNumber: "010-0123-4567" },
      { name: "이순신", phoneNumber: "010-3456-7890" },
      { name: "고경남", phoneNumber: "010-1234-5678" },
      { name: "김영희", phoneNumber: "010-2345-6789" },
      { name: "이철수", phoneNumber: "010-3456-7890" },
      { name: "박지민", phoneNumber: "010-4567-8901" },
      { name: "최현우", phoneNumber: "010-5678-9012" },
      { name: "이영희", phoneNumber: "010-6789-0123" },
      { name: "강철수", phoneNumber: "010-7890-1234" },
      { name: "김민지", phoneNumber: "010-8901-2345" },
      { name: "최민수", phoneNumber: "010-9012-3456" },
      { name: "홍길동", phoneNumber: "010-0123-4567" },
      { name: "이순신", phoneNumber: "010-3456-7890" },
      { name: "고경남", phoneNumber: "010-1234-5678" },
      { name: "김영희", phoneNumber: "010-2345-6789" },
      { name: "이철수", phoneNumber: "010-3456-7890" },
      { name: "박지민", phoneNumber: "010-4567-8901" },
      { name: "최현우", phoneNumber: "010-5678-9012" },
      { name: "이영희", phoneNumber: "010-6789-0123" },
      { name: "강철수", phoneNumber: "010-7890-1234" },
      { name: "김민지", phoneNumber: "010-8901-2345" },
      { name: "최민수", phoneNumber: "010-9012-3456" },
      { name: "홍길동", phoneNumber: "010-0123-4567" },
      { name: "이순신", phoneNumber: "010-3456-7890" },
      { name: "고경남", phoneNumber: "010-1234-5678" },
      { name: "김영희", phoneNumber: "010-2345-6789" },
      { name: "이철수", phoneNumber: "010-3456-7890" },
      { name: "박지민", phoneNumber: "010-4567-8901" },
      { name: "최현우", phoneNumber: "010-5678-9012" },
      { name: "이영희", phoneNumber: "010-6789-0123" },
      { name: "강철수", phoneNumber: "010-7890-1234" },
      { name: "김민지", phoneNumber: "010-8901-2345" },
      { name: "최민수", phoneNumber: "010-9012-3456" },
      { name: "홍길동", phoneNumber: "010-0123-4567" },
      { name: "이순신", phoneNumber: "010-3456-7890" },
      { name: "고경남", phoneNumber: "010-1234-5678" },
      { name: "김영희", phoneNumber: "010-2345-6789" },
      { name: "이철수", phoneNumber: "010-3456-7890" },
      { name: "박지민", phoneNumber: "010-4567-8901" },
      { name: "최현우", phoneNumber: "010-5678-9012" },
      { name: "이영희", phoneNumber: "010-6789-0123" },
      { name: "강철수", phoneNumber: "010-7890-1234" },
      { name: "김민지", phoneNumber: "010-8901-2345" },
      { name: "최민수", phoneNumber: "010-9012-3456" },
      { name: "홍길동", phoneNumber: "010-0123-4567" },
      { name: "이순신", phoneNumber: "010-3456-7890" },
      { name: "고경남", phoneNumber: "010-1234-5678" },
      { name: "김영희", phoneNumber: "010-2345-6789" },
      { name: "이철수", phoneNumber: "010-3456-7890" },
      { name: "박지민", phoneNumber: "010-4567-8901" },
      { name: "최현우", phoneNumber: "010-5678-9012" },
      { name: "이영희", phoneNumber: "010-6789-0123" },
      { name: "강철수", phoneNumber: "010-7890-1234" },
      { name: "김민지", phoneNumber: "010-8901-2345" },
      { name: "최민수", phoneNumber: "010-9012-3456" },
      { name: "홍길동", phoneNumber: "010-0123-4567" },
      { name: "이순신", phoneNumber: "010-3456-7890" },
      { name: "고경남", phoneNumber: "010-1234-5678" },
      { name: "김영희", phoneNumber: "010-2345-6789" },
      { name: "이철수", phoneNumber: "010-3456-7890" },
      { name: "박지민", phoneNumber: "010-4567-8901" },
      { name: "최현우", phoneNumber: "010-5678-9012" },
      { name: "이영희", phoneNumber: "010-6789-0123" },
      { name: "강철수", phoneNumber: "010-7890-1234" },
      { name: "김민지", phoneNumber: "010-8901-2345" },
      { name: "최민수", phoneNumber: "010-9012-3456" },
      { name: "홍길동", phoneNumber: "010-0123-4567" },
      { name: "이순신", phoneNumber: "010-3456-7890" },
      { name: "고경남", phoneNumber: "010-1234-5678" },
      { name: "김영희", phoneNumber: "010-2345-6789" },
      { name: "이철수", phoneNumber: "010-3456-7890" },
      { name: "박지민", phoneNumber: "010-4567-8901" },
      { name: "최현우", phoneNumber: "010-5678-9012" },
      { name: "이영희", phoneNumber: "010-6789-0123" },
      { name: "강철수", phoneNumber: "010-7890-1234" },
      { name: "김민지", phoneNumber: "010-8901-2345" },
      { name: "최민수", phoneNumber: "010-9012-3456" },
      { name: "홍길동", phoneNumber: "010-0123-4567" },
      { name: "이순신", phoneNumber: "010-3456-7890" },
      { name: "고경남", phoneNumber: "010-1234-5678" },
      { name: "김영희", phoneNumber: "010-2345-6789" },
      { name: "이철수", phoneNumber: "010-3456-7890" },
      { name: "박지민", phoneNumber: "010-4567-8901" },
      { name: "최현우", phoneNumber: "010-5678-9012" },
      { name: "이영희", phoneNumber: "010-6789-0123" },
      { name: "강철수", phoneNumber: "010-7890-1234" },
      { name: "김민지", phoneNumber: "010-8901-2345" },
      { name: "최민수", phoneNumber: "010-9012-3456" },
      { name: "홍길동", phoneNumber: "010-0123-4567" },
      { name: "이순신", phoneNumber: "010-3456-7890" },
      { name: "고경남", phoneNumber: "010-1234-5678" },
      { name: "김영희", phoneNumber: "010-2345-6789" },
      { name: "이철수", phoneNumber: "010-3456-7890" },
      { name: "박지민", phoneNumber: "010-4567-8901" },
      { name: "최현우", phoneNumber: "010-5678-9012" },
      { name: "이영희", phoneNumber: "010-6789-0123" },
      { name: "강철수", phoneNumber: "010-7890-1234" },
      { name: "김민지", phoneNumber: "010-8901-2345" },
      { name: "최민수", phoneNumber: "010-9012-3456" },
      { name: "홍길동", phoneNumber: "010-0123-4567" },
      { name: "이순신", phoneNumber: "010-3456-7890" },
    ];
    setWinners(mockWinners);

    fetchWinners();
  }, []);

  return (
    <div
      className="apply-background-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="apply-title-container">
        <div className="apply-sub-title">선착순 도서 선물 이벤트!!</div>
        <div className="apply-title">당첨자 발표</div>
      </div>

      <div className="winners-table-container">
        <table className="winners-table">
          <thead>
            <tr>
              <th>이름</th>
              <th>전화번호</th>
            </tr>
          </thead>
          <tbody>
            {winners.map((winner, index) => (
              <tr key={index}>
                <td>{winner.name}</td>
                <td>{winner.phoneNumber.slice(-4)}</td>{" "}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventResult;
