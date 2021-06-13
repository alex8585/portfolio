import asyncHandler from "express-async-handler"
import Portfolio from "../models/portfolioModel.js"

const getPortfolios = asyncHandler(async (req, res) => {
  const perPage = parseInt(req.query.perPage) || 1
  const page = parseInt(req.query.page) || 1

  const filter = JSON.parse(req.query.filter)
  const q = filter.q
  const direction = req.query.direction
  const sort = req.query.sort

  const keyword = {}

  if (!q) {
    if (filter.user) {
      keyword.user = filter.user
    }

    for (const property in filter) {
      if (property == "userId" || property == "user" || q) continue
      const val = filter[property]
      keyword[property] = { $regex: `${val}`, $options: "i" }
    }
  } else {
    keyword.$or = [
      { name: { $regex: `${q}`, $options: "i" } },
      { brand: { $regex: `${q}`, $options: "i" } },
      { category: { $regex: `${q}`, $options: "i" } },
      { description: { $regex: `${q}`, $options: "i" } },
    ]
  }

  const sortObj = {}
  if (direction && sort) {
    if (direction == "ASC") {
      sortObj[sort] = 1
    } else {
      sortObj[sort] = -1
    }
  }

  const count = await Portfolio.countDocuments(keyword)
  const portfolios = await Portfolio.find(keyword)
    .limit(perPage)
    .skip(perPage * (page - 1))
    .sort(sortObj)

  res.json({
    total: count,
    data: portfolios,
  })
})

const getPortfolioById = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id)

  if (portfolio) {
    res.json(portfolio)
  } else {
    res.status(404)
    throw new Error("Portfolio not found")
  }
})

const deletePortfolio = asyncHandler(async (req, res) => {
  let ids = false
  if (req.query.filter) {
    const filter = JSON.parse(req.query.filter)
    ids = filter.id
  }

  if (ids) {
    const result = await Portfolio.deleteMany({ _id: { $in: ids } })
    if (result.ok) {
      res.json({ data: ["Portfolio removed"] })
    } else {
      res.status(404)
      throw new Error("Portfolio not found")
    }
    return
  }

  const portfolio = await Portfolio.findById(req.params.id)

  if (portfolio) {
    await portfolio.remove()
    res.json({ data: ["Portfolio removed"] })
  } else {
    res.status(404)
    throw new Error("Portfolio not found")
  }
})

const createPortfolio = asyncHandler(async (req, res) => {
  const { name, description, img, url } = req.body

  const portfolio = new Portfolio({
    name,
    description,
    img,
    url,
  })

  const createdPortfolio = await portfolio.save()
  res.status(201).json(createdPortfolio)
})

const updatePortfolio = asyncHandler(async (req, res) => {
  const { name, description, img, url } = req.body

  const portfolio = await Portfolio.findById(req.params.id)

  if (portfolio) {
    portfolio.name = name
    portfolio.description = description
    portfolio.img = img
    portfolio.url = url
    const updatedPortfolio = await portfolio.save()
    res.json(updatedPortfolio)
  } else {
    res.status(404)
    throw new Error("Portfolio not found")
  }
})

export {
  getPortfolios,
  getPortfolioById,
  deletePortfolio,
  createPortfolio,
  updatePortfolio,
}
