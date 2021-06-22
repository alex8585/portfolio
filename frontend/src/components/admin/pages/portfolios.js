import React from "react"
//import { useQuery, useGetOne } from "react-admin"

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
  //AutocompleteArrayInput,
  ReferenceArrayInput,
  SelectArrayInput,
  //useReferenceArrayInputContext,
  //useMutation,
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

function formatTags(value) {
  //console.log(value)
  if (!value) return []
  return value.map((v) => {
    if (typeof v === "string") {
      return v
    }
    return v.id
  })
}
function formatImg(value) {
  if (!value || typeof value === "string") {
    return { src: value }
  } else {
    return value
  }
}

export const PortfolioCreate = (props) => {
  // const { data } = useQuery({
  //   type: "getList",
  //   resource: "tags",
  //   payload: {},
  // })

  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <ReferenceArrayInput
          format={formatTags}
          allowEmpty
          label="Tags"
          reference="tags"
          source="tags"
        >
          <SelectArrayInput
          //format={formatTags}
          //optionText="name"
          //optionValue="_id"
          //source="tags"
          //choices={data}
          />
        </ReferenceArrayInput>
        <TextInput source="description" />

        <ImageInput
          source="img"
          label="Img"
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

export const PortfolioEdit = (props) => {
  // const { data, loaded } = useQuery({
  //   type: "getList",
  //   resource: "tags",
  //   payload: {},
  // })
  //const { data: portfolio } = useGetOne("portfolios", props.id)

  //if (!loaded) return <span>Loading</span>

  //const [mutate] = useMutation()
  // const save = useCallback(
  //   async (values) => {
  //     console.log(values)
  //     values.tags = formatTags(values.tags)
  //     try {
  //       await mutate(
  //         {
  //           type: "update",
  //           resource: "portfolios",
  //           payload: { id: values.id, data: values },
  //         },
  //         { returnPromise: true }
  //       )
  //     } catch (error) {
  //       if (error) {
  //         return error
  //       }
  //     }
  //   },
  //   [mutate]
  // )

  const transform = (values) => {
    values.tags = formatTags(values.tags)
    return values
  }

  return (
    <Edit transform={transform} title={<PortfolioTitle />} {...props}>
      <SimpleForm redirect="/portfolios">
        <TextInput source="name" />
        <TextInput source="description" />
        <ReferenceArrayInput
          format={formatTags}
          allowEmpty
          label="Tags"
          reference="tags"
          source="tags"
        >
          <SelectArrayInput />
        </ReferenceArrayInput>

        <ImageInput
          format={formatImg}
          source="img"
          label="Img"
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
