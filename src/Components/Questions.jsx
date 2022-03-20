import React, { Component } from "react";

class Questions extends Component {
  state = {
    currentQuestion: 0,
    selected_answer: null,
    isAnswerTrue: false,
  };

  handleAnswerCheck = (selectedAnswer, ansIndex, rightAnswer) => {
    if (!selectedAnswer) return;
    this.setState({
      ...this.state,
      selected_answer: ansIndex,
      isAnswerTrue: rightAnswer === selectedAnswer,
    });
  };

  handleNextQuestion = () => {
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
      selected_answer: null,
      isAnswerTrue: false,
    });
  };

  render() {
    return (
      <div className="container-fluid d-flex flex-column min-vh-100 justify-content-center align-items-center">
        {this.props.results && this.props.results?.length > 0 ? (
          this.props.results.length > this.state.currentQuestion ? (
            <div>
              <div>
                <h2>
                  {this.props.results[this.state.currentQuestion].question}
                </h2>
              </div>
              <div>
                {[
                  ...this.props.results[this.state.currentQuestion]
                    .incorrect_answers,
                ]?.map((ans, index) => (
                  <button
                    className={
                      this.state.selected_answer === index
                        ? this.state.isAnswerTrue
                          ? "btn m-3 btn-success"
                          : "btn m-3 btn-danger"
                        : "btn btn-primary m-3"
                    }
                    key={index}
                    onClick={() =>
                      this.handleAnswerCheck(
                        ans,
                        index,
                        this.props.results[this.state.currentQuestion]
                          .correct_answer
                      )
                    }
                  >
                    {ans}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <h2>there where no questions</h2>
          )
        ) : (
          <h2>No Data Found</h2>
        )}
        {this.props.results &&
          this.props.results.length > this.state.currentQuestion && (
            <button onClick={this.handleNextQuestion} className="btn btn-info ">
              Next Question
            </button>
          )}
      </div>
    );
  }
}

export default Questions;
