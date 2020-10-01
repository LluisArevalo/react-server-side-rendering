import React from "react";

export const App = ({ questions, answers, handleVote }) => (
  <div>
    <h1>Q&amp;A Tool</h1>
    {questions.map(({ questionId, content }) => (
      <div key={questionId}>
        <h3>{content}</h3>
        <div>
          {answers
            .filter((answer) => answer.questionId === questionId)
            .map(({ content, upvotes, answerId }) => (
              <div key={answerId}>
                <span>
                  {content} - {upvotes}
                </span>
                <button onClick={() => handleVote(answerId, 1)}>+</button>
                <button onClick={() => handleVote(answerId, -1)}>-</button>
              </div>
            ))}
        </div>
      </div>
    ))}
  </div>
);
