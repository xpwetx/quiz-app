import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './shared/NavBar.jsx'
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import NotFound from './pages/NotFound';
import './App.css';

export default function App() {
  return (
    <>
    <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      </>
  );
}
