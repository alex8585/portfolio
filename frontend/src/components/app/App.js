import * as React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Admin from "../admin/Admin"
import Home from "../../pages/Home"
import "./App.css"
const App = () => (
  <Router>
    <div>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav> */}

      <Switch>
        <Route path="/admin" component={Admin}></Route>
        <Route path="/users">users</Route>
        <Route path="/" component={Home}></Route>
      </Switch>
    </div>
  </Router>
)

export default App
