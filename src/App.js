import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        {/* 프로필 선택 페이지 */}
        <Route path="/" element={<Home />} />
        {/* 로그인 페이지 */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
