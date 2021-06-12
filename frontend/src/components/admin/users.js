import * as React from "react"
import { List, Datagrid, TextField, EditButton } from "react-admin"
import MyUrlField from "./MyUrlField"
export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />

      <TextField source="email" />

      <TextField source="phone" />

      <MyUrlField source="website" />
      <TextField source="company.name" />
      <EditButton />
    </Datagrid>
  </List>
)
