import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function ResultsPage() {
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedScore = parseInt(localStorage.getItem('quizScore'), 10) || 0;
    const savedAnswers = JSON.parse(localStorage.getItem('quizAnswers') || '[]');
    setScore(savedScore);
    setUserAnswers(savedAnswers);
  }, []);

  const handlePlayAgain = () => {
    localStorage.removeItem('quizScore');
    localStorage.removeItem('quizAnswers');
    navigate('/quiz');
  };

  return (
    <div className="results">
      <h1>Quiz Complete!</h1>
      <p>Your score: {score} / {userAnswers.length}</p>

      <h2>Review your answers:</h2>
      <ul>
        {userAnswers.map((item, index) => (
          <li key={item.question}>
            <p dangerouslySetInnerHTML={{ __html: `Q${index + 1}: ${item.question}` }} />
            <p>
              <strong>Your answer:</strong>{' '}
              <span
                style={{ color: item.selectedAnswer === item.correct_answer ? 'green' : 'red' }}
                dangerouslySetInnerHTML={{ __html: item.selectedAnswer }}
              />
            </p>
            {item.selectedAnswer !== item.correct_answer && (
              <p>
                <strong>Correct answer:</strong>{' '}
                <span
                style={{ color: 'green' }}
                dangerouslySetInnerHTML={{ __html: item.correct_answer }} />
              </p>
            )}
          </li>
        ))}
      </ul>

      <button onClick={handlePlayAgain} style={{ marginTop: '2rem' }}>
        Play again!
      </button>
    </div>
  );
}

export default ResultsPage;
