import React, { Component } from "react";
//import our service
import JeopardyService from "../../jeopardyService";
class Jeopardy extends Component {
  //set our initial state and set up our service as this.client on this component
  constructor(props) {
    super(props);
    this.client = new JeopardyService();
    this.state = {
      data: {},
      score: 0,
      correct: false,
      submitted: false,
      formData: {
        answer: "",
      },
    };
  }
  //get a new random question from the API and add it to the data object in state
  getNewQuestion() {
    return this.client.getQuestion().then((result) => {
      this.setState({
        data: result.data[0],
      });
    });
  }
  //when the component mounts, get a the first question
  componentDidMount() {
    this.getNewQuestion();
  }

  handleChange = (event) => {
    const formData = { ...this.state.formData };
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.checkAnswer();
    this.setState({
      submitted: true,
    });
  };

  resetForm = (event) => {
    this.setState({
      submitted: false,
      formData: {
        answer: "",
      },
    });
    this.getNewQuestion();
  };

  checkAnswer() {
    if (
      this.state.formData.answer.toLowerCase() ===
      this.state.data.answer.toLowerCase()
    ) {
      this.setState((state, props) => ({
        correct: true,
        score: (state.score += this.state.data.value),
      }));
    } else {
      this.setState((state, props) => ({
        correct: false,
        score: (state.score -= this.state.data.value),
      }));
    }
  }

  //display the results on the screen
  render() {
    if (this.state.data.category === undefined) {
      return <div>Loading...</div>;
    }

    if (this.state.submitted === true && this.state.correct === true) {
      return (
        <div className="Contact">
          <p>Correct!</p>
          <button onClick={this.resetForm}>Next Question</button>
        </div>
      );
    } else if (this.state.submitted === true && this.state.correct === false) {
      return (
        <div className="Contact">
          <p>Wrong!!</p>
          <button onClick={this.resetForm}>Next Question</button>
        </div>
      );
    } else {
      console.log(this.state.data);
      console.log(this.state.formData.answer);

      const currentQuestion = this.state.data.question;
      const pointValue = this.state.data.value;
      const questionCategory = this.state.data.category.title;
      return (
        <div>
          <h2>Category: {questionCategory}</h2>
          <h2>{pointValue} points</h2>
          <h3>{currentQuestion}</h3>
          <h4>Current Score: {this.state.score}</h4>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="answer"></label>
              <input
                type="text"
                name="answer"
                placeholder="Answer..."
                value={this.state.formData.answer}
                onChange={this.handleChange}
              />
            </div>
            <button>Submit Answer</button>
          </form>
        </div>
      );
    }
  }
}

export default Jeopardy;
