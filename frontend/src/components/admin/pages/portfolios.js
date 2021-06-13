import * as React from "react"
import {
  List,
  Datagrid,
  TextInput,
  EditButton,
  Edit,
  SimpleForm,
  TextField,
  Create,
} from "react-admin"

export const PortfolioList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="img" />
      <TextField source="url" />
      <EditButton />
    </Datagrid>
  </List>
)

const PortfolioTitle = ({ record }) => {
  return <span>Tag {record ? `"${record.name}"` : ""}</span>
}

export const PortfolioEdit = (props) => (
  <Edit title={<PortfolioTitle />} {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="img" />
      <TextInput source="url" />
    </SimpleForm>
  </Edit>
)

export const PortfolioCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="img" />
      <TextInput source="url" />
    </SimpleForm>
  </Create>
)
