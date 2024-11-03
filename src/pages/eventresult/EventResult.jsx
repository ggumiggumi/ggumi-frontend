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
        const response = await axios.get(`${API_DOMAIN}/winner/list/test`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // 응답 데이터가 성공적일 때 winners 상태 업데이트
        if (response.data.status === "SUCCESS") {
          setWinners(response.data.data);
        } else {
          console.error("데이터 가져오기 실패:", response.data.message);
        }
      } catch (error) {
        console.error(
          "당첨자 데이터를 가져오는 데 오류가 발생했습니다:",
          error
        );
      }
    };

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
                <td>{winner.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventResult;
