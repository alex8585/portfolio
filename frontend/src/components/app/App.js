import * as React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Admin from "../admin/Admin"

import "./App.css"
import store from "../../store"
import { Provider } from "react-redux"

import Home from "../../pages/Home"
import About from "../../pages/About"
const App = () => (
  <Router>
    <div>
      <Switch>
        <Route path="/admin" component={Admin}></Route>
        <Provider store={store}>
          <Route exact path="/about" component={About}></Route>
          <Route exact path="/" component={Home}></Route>
        </Provider>
      </Switch>
    </div>
  </Router>
)

export default App
