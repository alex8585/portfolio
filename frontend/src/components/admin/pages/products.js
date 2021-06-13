import * as React from "react"
import { useMediaQuery } from "@material-ui/core"
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  EditButton,
  Edit,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
  Create,
  Filter,
  SimpleList,
  ChipField,
} from "react-admin"

const ProductTitle = ({ record }) => {
  return <span>Product {record ? `"${record.name}"` : ""}</span>
}

const ProductFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <TextInput source="name" />

    <TextInput source="brand" />

    <TextInput source="category" />
    <ReferenceInput label="User" source="user" reference="users" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
  </Filter>
)
// rating: 0,
//     numReviews: 0,
//     price: 399.99,
//     countInStock: 10,
//     _id: 60c45611db446d58b2a820a2,
//     name: 'tes4',
//     image: '/images/playstation.jpg',
//     description: 'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
//     brand: 'Sony',
//     category: 'Electronics',
//     user: 60c45611db446d58b2a82096,
//     reviews: [],
//     __v: 0,
//     createdAt: 2021-06-12T06:37:05.509Z,
//     updatedAt: 2021-06-12T06:37:05.509Z

export const ProductList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"))
  return (
    <List filters={<ProductFilter />} {...props}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.title}
          secondaryText={(record) => `${record.views} views`}
          tertiaryText={(record) =>
            new Date(record.published_at).toLocaleDateString()
          }
        />
      ) : (
        <Datagrid>
          <TextField source="name" />
          <TextField source="price" />
          <TextField source="brand" />
          <TextField source="countInStock" />
          <ChipField source="category" />
          <ReferenceField label="User" source="user" reference="users">
            <TextField source="name" />
          </ReferenceField>

          <EditButton />
        </Datagrid>
      )}
    </List>
  )
}

export const ProductEdit = (props) => (
  <Edit title={<ProductTitle />} {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="price" />
      <TextInput source="brand" />
      <TextInput source="countInStock" />
      <TextInput source="category" />
      <ReferenceInput label="User" source="user" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)

export const ProductCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="price" />
      <TextInput source="brand" />
      <TextInput source="countInStock" />
      <TextInput multiline source="description" />
      <TextInput source="category" />
      <ReferenceInput label="User" source="user" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)
