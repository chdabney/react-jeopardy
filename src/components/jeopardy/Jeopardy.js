import React, { Component } from "react";
import JeopardyDisplay from "../jeopardyDisplay/JeopardyDisplay";
import JeopardyScore from "../jeopardyScore/JeopardyScore";
//import our service
import JeopardyService from "../../jeopardyService";
import "../jeopardy/Jeopardy.css";

class Jeopardy extends Component {
  //set our initial state and set up our service as this.client on this component
  constructor(props) {
    super(props);
    this.client = new JeopardyService();
    this.state = {
      data: { category: "" },
      score: 0,
      formData: {
        answer: "",
      },
      questions: [],
    };
  }

  //get a new random question from the API and add it to the data object in state
  getNewQuestion() {
    return this.client.getQuestion().then((result) => {
      result.data.forEach((element) => {
        element.selected = false;
      });
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

  //   handleSubmit = (index) => {
  //     // event.preventDefault();
  //     this.checkAnswer(index);

  //   };

  checkAnswer = (index) => {
    if (
      this.state.formData.answer.toLowerCase() ===
      this.state.questions[index].answer.toLowerCase()
    ) {
      this.setState((state, props) => ({
        score: (state.score += this.state.data.value),
      }));
    } else {
      this.setState((state, props) => ({
        score: (state.score -= this.state.data.value),
      }));
    }

    this.getNewQuestion();
  };

  categorySelect = (index) => {
    const newQuestions = [...this.state.questions];
    newQuestions[index].selected = !newQuestions[index].selected;
    this.setState({
      questions: newQuestions,
    });
  };

  //display the results on the screen
  render() {
    return (
      <div>
        <JeopardyScore currentScore={this.state.score} />
        <div className="componentDisplay">
          {this.state.questions.map((questionObject, index) => (
            <JeopardyDisplay
              key={index}
              question={questionObject.question}
              selected={questionObject.selected}
              category={questionObject.category.title}
              points={questionObject.value}
              categoryData={questionObject.category}
              value={this.state.formData.answer}
              categorySelected={this.state.categorySelected}
              notSelected={this.state.notSelected}
              handleChange={this.handleChange}
              handleSubmit={() => this.checkAnswer(index)}
              categorySelect={() => this.categorySelect(index)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Jeopardy;
