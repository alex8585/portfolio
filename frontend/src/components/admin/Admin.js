import { Admin, Resource } from "react-admin"

import { UserList, UserEdit, UserCreate } from "../admin/pages/users"
import {
  ProductList,
  ProductEdit,
  ProductCreate,
} from "../admin/pages/products.js"

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
    <Resource
      name="users"
      icon={UserIcon}
      create={UserCreate}
      list={UserList}
      edit={UserEdit}
    />
  </Admin>
)

export default App
