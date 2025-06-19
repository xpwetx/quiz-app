import React from 'react';

function QuestionCard({ question, answers, selectedAnswer, onSelect }) {
  return (
    <div className='question-card'>
      <h2 dangerouslySetInnerHTML={{ __html: question }} />
      <form>
        {answers.map((answer) => (
          <label key={answer}>
            <input
              type='radio'
              name='answer'
              value={answer}
              checked={selectedAnswer === answer}
              onChange={() => onSelect(answer)}
            />
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </label>
        ))}
      </form>
    </div>
  );
}

export default QuestionCard;
