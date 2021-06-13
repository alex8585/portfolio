import { Admin, Resource } from "react-admin"
import ProductIcon from "@material-ui/icons/Book"
import UserIcon from "@material-ui/icons/Group"
import Dashboard from "../admin/Dashboard.js"
import authProvider from "../../providers/authProvider"
import dataProvider from "../../providers/dataProvider"
import customRoutes from "../admin/customRoutes"

import {
  ProductList,
  ProductEdit,
  ProductCreate,
} from "../admin/pages/products.js"
import { UserList, UserEdit, UserCreate } from "../admin/pages/users"
import { TagList, TagEdit, TagCreate } from "../admin/pages/tags"
import {
  PortfolioList,
  PortfolioEdit,
  PortfolioCreate,
} from "../admin/pages/portfolios"

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
    <Resource
      name="tags"
      icon={UserIcon}
      create={TagCreate}
      list={TagList}
      edit={TagEdit}
    />
    <Resource
      name="portfolios"
      icon={UserIcon}
      create={PortfolioCreate}
      list={PortfolioList}
      edit={PortfolioEdit}
    />
  </Admin>
)

export default App
