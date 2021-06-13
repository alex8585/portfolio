import * as React from "react"
import { Route } from "react-router-dom"
import Foo from "./Foo"

const customRoutes = [<Route exact path="/foo" component={Foo} />]

export default customRoutes
