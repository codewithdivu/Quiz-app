import React, { Component } from 'react';
import Questions from './Components/Questions';

class App extends Component {

  state = {
    result: '',
    isDataLoading: false
  }

  async fetchData() {
    this.setState({
      ...this.state,
      isDataLoading: true
    })
    const response = await fetch("https://opentdb.com/api.php?amount=50&type=multiple");
    let data = await response.json();
    this.setState({
      result: data?.results?.map(item => ({
        ...item, incorrect_answers: [...item?.incorrect_answers, item?.correct_answer]?.sort(() => Math.random() - 0.5)
      })),
      isDataLoading: false
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <>
        {this.state.isDataLoading ?
          <div className='d-flex flex-column min-vh-100 justify-content-center align-items-center'>
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only"></span>
            </div>
          </div> :
          <Questions
            results={this.state.result}
          />
        }
      </>)
  }
}

export default App;

