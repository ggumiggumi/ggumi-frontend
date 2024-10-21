import React, { useEffect, useState } from "react";
import axios from "axios";
import backgroundImage from "../../assets/background-yellow.png"; // 배경 이미지 경로
import heartSticker from "../../assets/ggumi-heart.png"; // 로고 이미지 경로
import "./styles/MbtiSurvey.css";
import QuestionCard from "../../components/QuestionCard";

const MbtiSurvey = () => {
  const questions = [
    {
      id: 1,
      question: "1. 주기적으로 새로운 친구를 만들어요.",
      type: "EI",
      weights: [100, 75, 50, 25, 0],
    },
    {
      id: 2,
      question:
        "2. 자유 시간 중 상당 부분을 다양한 관심사를 탐구하는 데 할애해요.",
      type: "SN",
      weights: [100, 75, 50, 25, 0],
    },
    {
      id: 3,
      question:
        "3. 다른 사람이 울고 있는 모습을 보면 자신도 울고 싶어질 때가 많아요.",
      type: "FT",
      weights: [100, 75, 50, 25, 0],
    },
    {
      id: 4,
      question: "4. 일이 잘못될 때를 대비해 여러 대비책을 세우는 편이에요.",
      type: "PJ",
      weights: [0, 25, 50, 75, 100],
    },
    {
      id: 5,
      question:
        "5. 파티나 행사에서 새로운 사람에게 먼저 자신을 소개하기보다는 주로 이미 알고 있는 사람과 대화하는 편이에요.",
      type: "EI",
      weights: [0, 25, 50, 75, 100],
    },
    {
      id: 6,
      question:
        "6. 하나의 프로젝트를 완전히 완료한 후 다른 프로젝트를 시작하는 편이다.",
      type: "PJ",
      weights: [0, 25, 50, 75, 100],
    },
    {
      id: 7,
      question: "7. 매우 감상적인 편이에요.",
      type: "FT",
      weights: [100, 75, 50, 25, 0],
    },
    {
      id: 8,
      question:
        "8. 예술 작품의 다양한 해석에 대해 토론하는 일에는 크게 관심이 없어요.",
      type: "SN",
      weights: [0, 25, 50, 75, 100],
    },
    {
      id: 9,
      question:
        "9. 관심이 가는 사람에게 다가가서 대화를 시작하기가 어렵지 않아요.",
      type: "EI",
      weights: [100, 75, 50, 25, 0],
    },
    {
      id: 10,
      question:
        "10. 결말을 자신의 방식으로 해석할 수 있는 책과 영화를 좋아한다.",
      type: "SN",
      weights: [100, 75, 50, 25, 0],
    },
    {
      id: 11,
      question: "11. 감성보다는 이성을 따르는 편이에요.",
      type: "FT",
      weights: [0, 25, 50, 75, 100],
    },
    {
      id: 12,
      question: "12. 일정이나 목록으로 계획을 세우는 일을 좋아해요.",
      type: "PJ",
      weights: [0, 25, 50, 75, 100],
    },
    {
      id: 13,
      question: "13. 단체 활동에 참여하는 일을 즐겨요.",
      type: "EI",
      weights: [100, 75, 50, 25, 0],
    },
    {
      id: 14,
      question:
        "14. 관심사가 너무 많아 다음에 어떤 일을 해야 할지 모를 때가 있어요.",
      type: "SN",
      weights: [100, 75, 50, 25, 0],
    },
    {
      id: 15,
      question: "15. 자신보다는 남의 성공을 돕는 일에서 더 큰 만족감을 느껴요.",
      type: "FT",
      weights: [100, 75, 50, 25, 0],
    },
    {
      id: 16,
      question: "16. 휴식을 취하기 전에 집안일을 먼저 끝내기를 원해요.",
      type: "PJ",
      weights: [0, 25, 50, 75, 100],
    },
    {
      id: 17,
      question: "17. 다른 사람의 주의를 끌지 않으려고 하는 편이에요.",
      type: "EI",
      weights: [0, 25, 50, 75, 100],
    },
    {
      id: 18,
      question: "18. 감정이 매우 빠르게 변하곤 해요.",
      type: "FT",
      weights: [100, 75, 50, 25, 0],
    },
    {
      id: 19,
      question: "19. 자신만큼 효율적이지 못한 사람을 보면 짜증이 나요.",
      type: "SN",
      weights: [0, 25, 50, 75, 100],
    },
    {
      id: 20,
      question: "20. 해야 할 일을 마지막까지 미룰 때가 많아요.",
      type: "PJ",
      weights: [100, 75, 50, 25, 0],
    },
  ];

  const [responses, setResponses] = useState({});

  const handleRadioChange = (name) => (event) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [name]: event.target.value, // 선택된 값을 저장
    }));
  };

  const calculateAverages = () => {
    for (const q of questions) {
      if (responses[`question${q.id}`] === undefined) {
        alert(`${q.id}번 질문에 체크해주세요.`);
        return;
      }
    }

    const typeSums = {};
    const typeCounts = {};

    questions.forEach((q) => {
      const responseValue = responses[`question${q.id}`];
      if (responseValue !== undefined) {
        const weight = q.weights[Number(responseValue)];
        const type = q.type;

        if (!typeSums[type]) {
          typeSums[type] = 0;
          typeCounts[type] = 0;
        }
        typeSums[type] += weight;
        typeCounts[type] += 1;
      }
    });

    const averages = {};
    for (const type in typeSums) {
      averages[type] =
        typeCounts[type] > 0 ? typeSums[type] / typeCounts[type] : 0;
    }

    console.log(averages);
    setMbtiDataToServer(averages);
  };

  const setMbtiDataToServer = async (averages) => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(
        `http://localhost:8080/api/histories/children/2`,
        JSON.stringify(averages),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("응답: ", response.data);
    } catch (error) {
      console.error("에러 발생: ", error);
    }
  };

  useEffect(() => {
    console.log(responses);
  }, [responses]);

  return (
    <div
      className="background-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="logo-container">
        <img src={heartSticker} alt="꾸미 로고" className="heart-logo" />
        <h1 className="logo-title">꾸미</h1>
      </div>
      <div className="survey-container">
        <div className="survey-title-container">
          <h2 className="survey-title">MBTI로 보는</h2>
          <h2 className="survey-title2">우리 아이 성향 검사</h2>
        </div>
        {questions.map((q) => (
          <QuestionCard
            key={q.id}
            question={q.question}
            name={`question${q.id}`}
            selectedValue={responses[`question${q.id}`]}
            onChange={handleRadioChange(`question${q.id}`)}
            weights={q.weights}
          />
        ))}
        <div className="button-container">
          <div className="start-button" onClick={calculateAverages}>
            검사 결과로 고고씽!
          </div>
        </div>
      </div>
    </div>
  );
};

export default MbtiSurvey;
