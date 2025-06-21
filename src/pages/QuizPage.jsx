import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../shared/QuestionCard";
import "../App.css";

// Load API URL from environment variables
const apiUrl = import.meta.env.VITE_API_URL;

function QuizPage() {
  // State for quiz data and user interaction
  const [questions, setQuestions] = useState([]); // array of quiz questions
  const [currentIndex, setCurrentIndex] = useState(0); // current question index
  const [selectedAnswer, setSelectedAnswer] = useState(""); // user's selected answer
  const [score, setScore] = useState(0); // user's current score
  const [loading, setLoading] = useState(true); // loading state for API fetch
  const [error, setError] = useState(null); // error message, if any
  const [userAnswers, setUserAnswers] = useState([]); // store user's answers for review
  const navigate = useNavigate();

// Fetch quiz questions from API, memorized to avoid unnecessary refetching
  const fetchQuestions = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}?amount=10&type=multiple`);
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      const data = await res.json();

      // validate response data
      if (!data.results || data.results.length === 0) {
        throw new Error("No questions returned.");
      }
      setQuestions(data.results);
    } catch (err) {
      console.error("Fetch error:", err.message);
      setError("Failed to load questions. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);


  // fetch questions on component mount
  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // handler for selecting answer
  const handleSelect = useCallback((answer) => {
    setSelectedAnswer(answer);
  }, []);

  // handler for progressing to next question or finish quiz
  const handleNext = () => {
    const currentQuestion = questions[currentIndex];

    // Check if selected answer matches correct one
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;

    // add current answer to user's answer list
    const updatedAnswers = [
      ...userAnswers,
      {
        question: currentQuestion.question,
        correct_answer: currentQuestion.correct_answer,
        selectedAnswer,
      },
    ];
    setUserAnswers(updatedAnswers);

    // Update score if correct
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    // Move to next question or finish quiz
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer("");
    } else {

      // Save score and answers to localStorage for results page
      const finalScore = score + (isCorrect ? 1 : 0);
      localStorage.setItem("quizScore", finalScore);
      localStorage.setItem("quizAnswers", JSON.stringify(updatedAnswers));
      navigate("/results");
    }
  };

  // handler to restart quiz, reset all relevant state and refetching questions
  const handleRestart = () => {
    setError(null);
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer("");
    setScore(0);
    setUserAnswers([]);
    setLoading(true);
    fetchQuestions();
  };

  // render loading message while fetching data
  if (loading) return <p>Loading quiz...</p>;

  // render error message and restart button if fetch failed
  if (error)
    return (
      <div>
        <p>{error}</p>
        <button
          onClick={handleRestart}
          style={{
            backgroundColor: "orange",
            color: "black",
            marginTop: "1rem",
          }}
        >
          Restart quiz
        </button>
      </div>
    );


    // if no questions available, show fallback message
  if (!questions.length || currentIndex >= questions.length)
    return <p>No questions found.</p>;

  // current question data and all possible answers
  const currentQuestion = questions[currentIndex];
  const allAnswers = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ].sort();

  return (
    <div className="container">
      <h1>
        Question {currentIndex + 1} of {questions.length}
      </h1>
      <QuestionCard
        key={currentQuestion.question}
        question={currentQuestion.question}
        answers={allAnswers}
        selectedAnswer={selectedAnswer}
        onSelect={handleSelect}
      />

      {/* Next and Restart buttons */}
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button onClick={handleNext} disabled={!selectedAnswer}>
          {currentIndex === questions.length - 1 ? "Finish Quiz" : "Next"}
        </button>
        <button
          onClick={handleRestart}
          style={{ backgroundColor: "orange", color: "black" }}
        >
          Restart quiz
        </button>
      </div>
    </div>
  );
}

export default QuizPage;
