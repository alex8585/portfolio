import * as React from "react"
import {
  List,
  Datagrid,
  TextInput,
  EditButton,
  BooleanField,
  DateField,
  FunctionField,
  Edit,
  SimpleForm,
  BooleanInput,
  Create,
  PasswordInput,
} from "react-admin"
import MyUrlField from "../fields/MyUrlField.js"

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <FunctionField label="Name" render={(record) => `${record.name}`} />
      <MyUrlField source="email" />
      <BooleanField source="isAdmin" />
      <DateField source="createdAt" />

      <EditButton />
    </Datagrid>
  </List>
)

const UserTitle = ({ record }) => {
  return <span>Product {record ? `"${record.name}"` : ""}</span>
}

export const UserEdit = (props) => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <BooleanInput source="isAdmin" />
    </SimpleForm>
  </Edit>
)

export const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <PasswordInput source="password" />
      <BooleanInput source="isAdmin" />
    </SimpleForm>
  </Create>
)
