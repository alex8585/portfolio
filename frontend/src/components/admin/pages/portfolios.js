import React, { useEffect } from "react"
import { useQuery, useGetOne } from "react-admin"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
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
  AutocompleteArrayInput,
  AutocompleteArrayInputChip,
  ReferenceArrayInput,
  SelectArrayInput,
  SelectInput,
  ChipField,
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

export const PortfolioEdit = (props) => {
  // const { data, loaded } = useQuery({
  //   type: "getList",
  //   resource: "tags",
  //   payload: {},
  // })
  //const { data: portfolio } = useGetOne("portfolios", props.id)

  //if (!loaded) return <span>Loading</span>

  function formatImg(value) {
    if (!value || typeof value === "string") {
      return { src: value }
    } else {
      return value
    }
  }

  function formatTags(value) {
    if (!value) return []
    return value.map((v) => {
      if (typeof v === "string") {
        return v
      }
      return v.id
    })
  }

  return (
    <Edit title={<PortfolioTitle />} {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="description" />
        <ReferenceArrayInput
          format={formatTags}
          allowEmpty
          label="Tags"
          reference="tags"
          source="tags"
        >
          <SelectArrayInput
            //options={{ value: ["60c5e6e3428873bbadd3bc9c"] }}
            label="Tags"
          />
        </ReferenceArrayInput>

        <ImageInput
          format={formatImg}
          source="fullImg"
          label="Related pictures"
          accept="image/*"
          placeholder={<p>Drop your file here</p>}
        >
          <ImageField source="src" />
        </ImageInput>

        <TextInput source="url" />
      </SimpleForm>
    </Edit>
  )
}

export const PortfolioCreate = (props) => {
  const { data } = useQuery({
    type: "getList",
    resource: "tags",
    payload: {},
  })
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <AutocompleteArrayInput
          optionText="name"
          optionValue="_id"
          source="tags"
          choices={data}
        />
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
}
