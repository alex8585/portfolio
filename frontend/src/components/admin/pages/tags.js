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

export const TagList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="order_number" />
      <EditButton />
    </Datagrid>
  </List>
)

const TagTitle = ({ record }) => {
  return <span>Tag {record ? `"${record.name}"` : ""}</span>
}

export const TagEdit = (props) => (
  <Edit title={<TagTitle />} {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="order_number" />
    </SimpleForm>
  </Edit>
)

export const TagCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="order_number" />
    </SimpleForm>
  </Create>
)
