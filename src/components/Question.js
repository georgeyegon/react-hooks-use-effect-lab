import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Set up the timer
    if (timeRemaining > 0) {
      const timeout = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1); // Decrease time by 1 each second
      }, 1000);

      // Cleanup function to clear the timeout when the component unmounts or when timeRemaining changes
      return () => clearTimeout(timeout);
    } else {
      // Reset timeRemaining and notify parent component
      setTimeRemaining(10);
      onAnswered(false); // Trigger the onAnswered callback with 'false' when time runs out
    }
  }, [timeRemaining, onAnswered]); // Dependencies array includes timeRemaining to trigger effect when it changes

  const { id, prompt, answers, correctIndex } = question;

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset the timer if the user answers
    onAnswered(isCorrect); // Pass the answer result to the parent component
  }

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
