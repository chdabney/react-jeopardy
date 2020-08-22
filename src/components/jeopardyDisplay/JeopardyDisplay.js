import React from "react";

function JeopardyDisplay(props) {
  return (
    <div className="JeopardyDisplay">
      <div>
        <h2>Category: {props.category}</h2>
        <h2>{props.points} points</h2>
        <h3>{props.question}</h3>
        <h4>Current Score: {props.currentScore}</h4>
        <form onSubmit={props.handleSubmit}>
          <div>
            <label htmlFor="answer"></label>
            <input
              type="text"
              name="answer"
              placeholder="Answer..."
              value={props.answer}
              onChange={props.handleChange}
            />
          </div>
          <button>Submit Answer</button>
        </form>
      </div>
    </div>
  );
}

export default JeopardyDisplay;
