import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";

class LambdaDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: false, msg: null};
  }

  handleClick = api => e => {
    e.preventDefault();

    this.setState({loading: true});
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => this.setState({loading: false, msg: json.msg}));
  };

  postToken = username => e => {
    e.preventDefault();
    let data = {username};
    this.setState({loading: true});
    fetch("/.netlify/functions/api/postToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json =>
        this.setState({loading: false, msg: json.msg, jwt: json.token})
      );
  };

  getData = e => {
    e.preventDefault();
    this.setState({loading: true});
    fetch("/.netlify/functions/api/getData", {
      method: "GET",
      headers: {authorization: "Bearer " + this.state.jwt}
    })
      .then(response => response.json())
      .then(json => this.setState({loading: false, msg: json.msg}));
  };

  render() {
    const {loading, msg} = this.state;

    return (
      <p>
        <button onClick={this.postToken("hello")}>
          {loading ? "Loading..." : "postToken"}
        </button>
        <button onClick={this.getData}>
          {loading ? "Loading..." : "getData"}
        </button>
        {/* <button onClick={this.handleClick("async-chuck-norris")}>
          {loading ? "Loading..." : "Call Async Lambda"}
        </button> */}
        <br />
        <span>{msg}</span>
      </p>
    );
  }
}

class App2 extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <LambdaDemo />
        </header>
      </div>
    );
  }
}

export default App2;
