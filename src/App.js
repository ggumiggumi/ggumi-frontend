import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddChild from "./pages/AddChild";
import MbtiMain from "./pages/MbtiMain";
import BookDetail from "./pages/BookDetail";

function App() {
  return (
    <Router>
      <Routes>
        {/* 프로필 선택 페이지 */}
        <Route path="/" element={<Home />} />
        {/* 로그인 페이지 */}
        <Route path="/login" element={<Login />} />
        {/* 프로필 생성 페이지*/}
        <Route path="/add-child" element={<AddChild />} />
        {/* MBTI 검사 전 메인 페이지 */}
        <Route path="/mbti/main" element={<MbtiMain />} />
        <Route path="/book-detail" element={<BookDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
