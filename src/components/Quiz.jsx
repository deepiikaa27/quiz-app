import React, { useEffect, useState } from "react";
import Question from "./Question";
import Result from "./Result";

const Quiz = () => {
  const [questis, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [badge, setBadge] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/Uw5CrX");
        const data = await response.json();

        setQuestions(data.questions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsCompleted(true);
    }
  }, [timeLeft, isCompleted]);

  const assignBadge = (finalScore) => {
    if (finalScore === questis.length) setBadge("Quiz Master");
    else if (finalScore > questis.length / 2) setBadge("Quiz Enthusiast");
    else setBadge("Better Luck Next Time");
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    if (currentIndex + 1 < questis.length) {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(30);
    } else {
      setIsCompleted(true);
      assignBadge(score + isCorrect ? 1 : 0);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
      {!isCompleted ? (
        <div>
          <div className="text-right text-red-500">Time left : {timeLeft}</div>
          {/* {questis[0].id} */}
          <Question data={questis[currentIndex]} handleAnswer={handleAnswer} />
        </div>
      ) : (
        <Result score={score} total={questis.length} badge={badge} />
      )}
    </div>
  );
};

export default Quiz;
