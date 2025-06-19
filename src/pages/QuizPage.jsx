import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../shared/QuestionCard';
const apiUrl = import.meta.env.VITE_API_URL;

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log('API URL:', apiUrl);
        const res = await fetch(`${apiUrl}?amount=5&type=multiple`);
        const data = await res.json();
        console.log('Fetched data:', data);
        setQuestions(data.results);
      } catch (err) {
        setError('Failed to load quiz questions.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

const handleSelect = useCallback((answer) => {
  setSelectedAnswer(answer);
}, []);

  const handleNext = () => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;

    const updatedAnswers =[
    ...userAnswers,
    {
      question: currentQuestion.question,
      correct_answer: currentQuestion.correct_answer,
      selectedAnswer,
    },
    ];
    setUserAnswers(updatedAnswers);
   
    if (isCorrect) {
      setScore((prev) => prev + 1);
      }

      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedAnswer('');
      } else {
        const finalScore = score + (isCorrect ? 1 : 0);
        localStorage.setItem('quizScore', finalScore);
        localStorage.setItem('quizAnswers', JSON.stringify(updatedAnswers));
        navigate('/results');
      }
    };

  if (loading) return <p>Loading quiz...</p>;
  if (error) return <p>{error}</p>;
  if (!questions.length) return <p>No questions found.</p>;

  const currentQuestion = questions[currentIndex];
  const allAnswers = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ].sort();

  return (
    <div className='container'>
      <h1>
        Question {currentIndex + 1} of {questions.length}
      </h1>
      <QuestionCard
        question={currentQuestion.question}
        answers={allAnswers}
        selectedAnswer={selectedAnswer}
        onSelect={handleSelect}
      />
      <button onClick={handleNext} disabled={!selectedAnswer}>
        {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next'}
      </button>
    </div>
  );
}

export default QuizPage;
