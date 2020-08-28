import React from "react";
import "../jeopardyDisplay/JeopardyDisplay.css";

function JeopardyDisplay(props) {
  if (props.categoryData === undefined) {
    return <div>Loading...</div>;
  }

  if (!props.selected) {
    return (
      <div>
        <div className="categories">
          <div>
            <h2>{props.category} </h2>
          </div>
        </div>
        <button className="categoryButton" onClick={props.categorySelect}>
          Select Category
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="questionDisplay">
        <h4>Current Score: {props.currentScore}</h4>
        <h2>{props.points} points</h2>
        <h3>{props.question}</h3>

        <label htmlFor="answer"></label>
        <input
          type="text"
          name="answer"
          placeholder="Answer..."
          value={props.answer}
          onChange={props.handleChange}
        />
      </div>
      <button onClick={props.handleSubmit}>Submit Answer</button>
    </div>
  );
}

export default JeopardyDisplay;
