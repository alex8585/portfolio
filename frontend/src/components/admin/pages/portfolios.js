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
  ImageInput,
  ImageField,
  DateField,
} from "react-admin"

export const PortfolioList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="description" />
      <ImageField label="Image" source="fullImg" />
      <TextField source="url" />
      <DateField source="createdAt" />
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

      <ImageInput
        source="img"
        label="Related pictures"
        accept="image/*"
        placeholder={<p>Drop your file here</p>}
      >
        <ImageField source="src" title="title" />
      </ImageInput>

      <TextInput source="url" />
    </SimpleForm>
  </Edit>
)

export const PortfolioCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" />

      <ImageInput
        source="img"
        label="Related pictures"
        accept="image/*"
        placeholder={<p>Drop your file here</p>}
      >
        <ImageField source="src" title="title" />
      </ImageInput>

      <TextInput source="url" />
    </SimpleForm>
  </Create>
)
