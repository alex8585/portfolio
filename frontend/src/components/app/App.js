import * as React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Admin from "../admin/Admin"

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
        <Route path="/">home</Route>
      </Switch>
    </div>
  </Router>
)

export default App
