// in src/App.js
import * as React from "react"
import { Admin, Resource, EditGuesser } from "react-admin"
import { UserList } from "./components/admin/users"
//import jsonServerProvider from "ra-data-json-server"
import { PostList, PostEdit, PostCreate } from "./components/admin/posts.js.js"
import PostIcon from "@material-ui/icons/Book"
import UserIcon from "@material-ui/icons/Group"
import Dashboard from "./components/admin/Dashboard.js.js"
import authProvider from "./providers/authProvider"
import dataProvider from "./providers/dataProvider"

//const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com")
const App = () => (
  <Admin
    dashboard={Dashboard}
    authProvider={authProvider}
    dataProvider={dataProvider}
  >
    <Resource
      name="posts"
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
      icon={PostIcon}
    />
    <Resource name="users" icon={UserIcon} list={UserList} edit={EditGuesser} />
  </Admin>
)

export default App
