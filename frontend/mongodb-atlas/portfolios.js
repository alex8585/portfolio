// This function is the webhook's request handler.
//var fileId = context.Types.ObjectId()

exports = async function (req, res) {
  const calcPages = (pageSize, totalCount) => {
    return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize)
  }

  const perPage = parseInt(req.query.perPage) || 20
  const page = parseInt(req.query.page) || 1
  const direction = req.query.direction
  const sort = req.query.sort
  const filterString = req.query.filter

  const sortObj = {}
  if (direction && sort) {
    if (direction == "ASC") {
      sortObj[sort] = 1
    } else {
      sortObj[sort] = -1
    }
  } else {
    sortObj["order_number"] = 1
  }

  const filterObj = {}
  if (filterString) {
    const filter = JSON.parse(req.query.filter)
    const q = filter.q
    if (!q) {
      if (filter.user) {
        filterObj.user = filter.user
      }

      for (const property in filter) {
        const val = filter[property]

        if (property == "tags") {
          let tagsFilter = val.split(",").map((id) => {
            return new BSON.ObjectId(id)
          })
          filterObj["tags"] = { $in: tagsFilter }
        }

        if (
          property == "tags" ||
          property == "userId" ||
          property == "user" ||
          q
        )
          continue

        filterObj[property] = { $regex: `${val}`, $options: "i" }
      }
    } else {
      filterObj.$or = [
        { name: { $regex: `${q}`, $options: "i" } },
        { brand: { $regex: `${q}`, $options: "i" } },
        { category: { $regex: `${q}`, $options: "i" } },
        { description: { $regex: `${q}`, $options: "i" } },
      ]
    }
  }

  let skip = perPage * (page - 1)

  const tagsCollection = context.services
    .get("mongodb-atlas")
    .db("portfoliosDB")
    .collection("tags")

  let tags = await tagsCollection
    .find(filterObj)
    .limit(perPage)
    .skip(skip)
    .sort(sortObj)
    .toArray()
  tags = tags.map((e) => {
    e.id = e._id.toString()
    return e
  })

  const collection = context.services
    .get("mongodb-atlas")
    .db("portfoliosDB")
    .collection("portfolios")
  const total = await collection.count(filterObj)
  let data = await collection
    .find(filterObj)
    .limit(perPage)
    .skip(skip)
    .sort(sortObj)
    .toArray()

  let newData = data.map((e) => {
    e.id = e._id.toString()

    e.tags = e.tags.map((id) => {
      return tags.find((tag) => {
        return id == tag.id
      })
    })
    //console.log(e.tags)
    return e
  })

  let pages = calcPages(perPage, total)
  // console.log(newData)
  return {
    page: page.toString(),
    perPage: perPage.toString(),
    total: total.toString(),
    pages: pages.toString(),
    data: newData,
    filterObj,
  }
}
