// in src/App.js
import * as React from "react"
import { Admin, Resource, EditGuesser } from "react-admin"

import { UserList } from "../admin/users"
import { ProductList, ProductEdit, ProductCreate } from "../admin/products.js"

import ProductIcon from "@material-ui/icons/Book"
import UserIcon from "@material-ui/icons/Group"
import Dashboard from "../admin/Dashboard.js"
import authProvider from "../../providers/authProvider"
import dataProvider from "../../providers/dataProvider"
import customRoutes from "../admin/customRoutes"
const App = () => (
  <Admin
    disableTelemetry
    dashboard={Dashboard}
    authProvider={authProvider}
    dataProvider={dataProvider}
    customRoutes={customRoutes}
  >
    <Resource
      name="products"
      list={ProductList}
      edit={ProductEdit}
      create={ProductCreate}
      icon={ProductIcon}
    />
    <Resource name="users" icon={UserIcon} list={UserList} edit={EditGuesser} />
  </Admin>
)

export default App
