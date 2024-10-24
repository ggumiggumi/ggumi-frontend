import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_DOMAIN } from "../apis/api";

const CLIENT_ID = "49ca0576cd2ac11f1b1e5b04b39741b5"; // 카카오 앱 키
const REDIRECT_URI = "http://localhost:3000/auth/callback"; // Redirect URI

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        try {
          const response = await axios.post(
            "https://kauth.kakao.com/oauth/token",
            null,
            {
              params: {
                grant_type: "authorization_code",
                client_id: CLIENT_ID,
                redirect_uri: REDIRECT_URI,
                code: code,
              },
            }
          );

          const { access_token } = response.data;
          console.log("Access Token:", access_token);

          const serverResponse = await axios.post(`${API_DOMAIN}/oauth/kakao`, {
            kakaoAccessToken: access_token,
          });

          console.log(serverResponse.data.data);

          const { accessToken, refreshToken } = serverResponse.data.data;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          navigate("/profiles");
        } catch (error) {
          console.error("Error during token retrieval:", error);
        }
      }
    };

    getToken();
  }, []);

  return <div>로그인 처리 중...</div>;
};

export default AuthCallback;
