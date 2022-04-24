import './App.css';
import React, { Component } from 'react';

const API =
  'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

export default class App extends Component {
  state = {
    // making an empty array of quotes,
    // randomize the index and show diff quote every time a button is clicked!
    quotes: [
      {
        quote:
          'Life isn’t about getting and having, it’s about giving and being.',
        author: 'Kevin Kruse',
      },
    ],
    index: 0,
  };

  // componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
  componentDidMount() {
    // call the API and update state
    // calling the 'fetch API' and passing our API, then store results in json, updaing the state , storing our data in state i.e quotes
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        this.setState(
          {
            quotes: res.quotes,
          },
          this.getRandomIndex
        ); //res is the object we are getting named and quotes is the property of object contains an array
      });
  }

  // function for getting random index
  getRandomIndex = () => {
    const { quotes } = this.state;
    if (quotes.length > 0) {
      const index = Math.floor(Math.random() * quotes.length) + 1;
      this.setState({ index });
    }
  };

  render() {
    // getting quote and index from above to render
    const { quotes, index } = this.state;
    // storing a random quote on the base of its index
    const q = quotes[index];

    // wont work, we dont have quote yet. COnfusing! so we creat the dummy object at the beginning to make it work
    const tweeURL = `https://twitter.com/intent/tweet?text=${q.quote} - ${q.author}`;

    return (
      // wrapper,box, are custom css class
      <div className="wrapper d-flex align-items-center justify-content-center">
        <div className="box col-6 p-4 rounded" id="quote-box">
          {/* q is variable and quote is the property of object we are getting from the API. q && means if q exists, SIMPLY A CHECK*/}
          {q && (
            <div className="mb-4">
              <p id="text">{q.quote}</p>
              <cite id="author" className="d-flex justify-content-end">
                - {q.author}
              </cite>
            </div>
          )}

          <div className="d-flex justify-content-between">
            <a
              id="tweet-quote"
              className="btn btn-sm btn-primary"
              href={tweeURL}
            >
              <i className="fa-brands fa-twitter mx-2"></i>Tweet
            </a>
            <button
              id="new-quote"
              className="btn btn-sm btn-dark "
              onClick={this.getRandomIndex}
            >
              <i class="fa-solid fa-shuffle mx-2"></i>
              Get Quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}
