import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
    <Routes>
      {/* 프로필 선택 페이지 */}
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
  );
}

export default App;
