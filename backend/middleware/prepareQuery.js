const prepareQuery = (req, res, next) => {
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
        if (property == "userId" || property == "user" || q) continue
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

  req.mongoParams = {
    skip: perPage * (page - 1),
    perPage,
    sortObj,
    filterObj,
    page,
  }

  next()
}

export default prepareQuery
