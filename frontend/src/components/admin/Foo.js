import * as React from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import { Title } from "react-admin"

const Foo = () => (
  <Card>
    <Title title="Foo" />
    <CardContent>Foo</CardContent>
    <form method="post" enctype="multipart/form-data" action="/upload">
      <input type="file" name="img" />
      <input type="submit" value="Upload" />
    </form>
  </Card>
)

export default Foo
