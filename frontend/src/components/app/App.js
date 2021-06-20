import * as React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Admin from "../admin/Admin"
import Home from "../../pages/Home"
import "./App.css"
import store from "../../store"
import { Provider } from "react-redux"
const App = () => (
  <Router>
    <div>
      <Switch>
        <Route path="/admin" component={Admin}></Route>
        <Provider store={store}>
          <Route path="/users">users</Route>
          <Route path="/" component={Home}></Route>
        </Provider>
      </Switch>
    </div>
  </Router>
)

export default App
