import React, { Component } from "react";
import JeopardyDisplay from "../jeopardyDisplay/JeopardyDisplay";
//import our service
import JeopardyService from "../../jeopardyService";
class Jeopardy extends Component {
  //set our initial state and set up our service as this.client on this component
  constructor(props) {
    super(props);
    this.client = new JeopardyService();
    this.state = {
      data: { category: "" },
      score: 0,
      categorySelected: false,
      formData: {
        answer: "",
      },
      questions: [],
    };
  }
  //get a new random question from the API and add it to the data object in state
  getNewQuestion() {
    return this.client.getQuestion().then((result) => {
      this.setState({
        data: result.data[0],
        questions: result.data,
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
      categorySelected: false,
    });
    this.getNewQuestion();
  };

  checkAnswer() {
    if (
      this.state.formData.answer.toLowerCase() ===
      this.state.data.answer.toLowerCase()
    ) {
      this.setState((state, props) => ({
        score: (state.score += this.state.data.value),
        formData: {
          answer: "",
        },
      }));
    } else {
      this.setState((state, props) => ({
        score: (state.score -= this.state.data.value),
        formData: {
          answer: "",
        },
      }));
    }
  }

  categorySelect = (event) => {
    this.setState({
      categorySelected: true,
    });
  };

  //display the results on the screen
  render() {
    return (
      <div>
        {this.state.questions.map((questionObject, index) => (
          <JeopardyDisplay
            key={index}
            question={questionObject.question}
            category={questionObject.category.title}
            points={questionObject.value}
            categoryData={questionObject.category}
            value={this.state.formData.answer}
            categorySelected={this.state.categorySelected}
            currentScore={this.state.score}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            categorySelect={this.categorySelect}
          />
        ))}
      </div>
    );
  }
}

export default Jeopardy;
