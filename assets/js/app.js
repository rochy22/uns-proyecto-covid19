import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "../css/app.css";
// Pages
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import News from "./pages/News";
import Tweets from "./pages/Tweets";
import World from "./pages/World";
// Components
import RequestTweets from "./pages/RequestTweets";

ReactDOM.render(
  <Router>
    <Navbar />
    <RequestTweets />
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route path="/home" component={Home} />
      <Route path="/tweets" component={Tweets} />
      <Route path="/news" component={News} />
      <Route path="/world" component={World} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
