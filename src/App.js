import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddChild from "./pages/AddChild";
import MbtiMain from "./pages/MbtiMain";
import MBTISurvey from "./pages/MBTISurvey/index";
import MbtiResultPage from "./pages/MbtiResultPage";
import BookDetail from "./pages/BookDetail";
import MainPage from "./pages/MainPage";
import History from "./pages/History";
import Search from "./pages/search/index";
import Callback from "./pages/AuthCallback";

function App() {
  return (
    <Router>
      <Routes>
        {/* 프로필 선택 페이지 */}
        <Route path="/profiles" element={<Home />} />
        {/* 로그인 페이지 */}
        <Route path="/login" element={<Login />} />
        {/* 프로필 생성 페이지*/}
        <Route path="/add-child" element={<AddChild />} />
        {/* MBTI 검사 전 메인 페이지 */}
        <Route path="/mbti/main" element={<MbtiMain />} />
        {/* MBTI 검사 페이지 */}
        <Route path="/mbti/survey" element={<MBTISurvey />} />
        {/* MBTI 검사 결과 페이지 */}
        <Route path="/mbti/result" element={<MbtiResultPage />} />
        {/* 도서 상세 페이지 */}
        <Route path="/book-detail/:bookId" element={<BookDetail />} />
        {/* 메인 페이지*/}
        <Route path="/main" element={<MainPage />} />
        {/* 히스토리 페이지 */}
        <Route path="/history" element={<History />} />
        {/* 도서 검색 페이지 */}
        <Route path="/search" element={<Search />} />
        {/* 콜백 페이지 */}
        <Route path="/auth/callback" element={<Callback />} />
      </Routes>
    </Router>
  );
}

export default App;
