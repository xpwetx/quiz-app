import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import './App.css';

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/quiz">Quiz</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </div>
  );
}
