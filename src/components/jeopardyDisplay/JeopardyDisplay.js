import React from "react";

function JeopardyDisplay(props) {
  if (props.categoryData === undefined) {
    return <div>Loading...</div>;
  }

  if (!props.categorySelected) {
    return (
      <div>
        <h4>Current Score: {props.currentScore}</h4>
        <div className="categoryDisplay">
          <div className="categories">
            <h1>{props.category} </h1>
            <button onClick={props.categorySelect}>Select Category</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="JeopardyDisplay">
      <div>
        <h4>Current Score: {props.currentScore}</h4>
        <h2>{props.points} points</h2>
        <h3>{props.question}</h3>
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
