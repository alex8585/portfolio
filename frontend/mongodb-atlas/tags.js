// This function is the webhook's request handler.
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
        if (property == "userId" || property == "user" || q) {
          continue
        }
        const val = filter[property]
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

  const collection = context.services
    .get("mongodb-atlas")
    .db("portfoliosDB")
    .collection("tags")
  const total = await collection.count(filterObj)
  const data = await collection
    .find(filterObj)
    .limit(perPage)
    .skip(skip)
    .sort(sortObj)
    .toArray()
  let newData = data.map((e) => {
    e.id = e._id.toString()
    return e
  })

  return {
    total,
    data: newData,
  }
}
