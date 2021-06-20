import asyncHandler from "express-async-handler"
import Portfolio from "../models/portfolioModel.js"
import { calcPages } from "../utils/generateToken.js"
import Tag from "../models/tagModel.js"
const getPortfolios = asyncHandler(async (req, res) => {
  const { perPage, sortObj, filterObj, skip, page } = req.mongoParams

  const total = await Portfolio.countDocuments(filterObj)
  const data = await Portfolio.find(filterObj)
    .limit(perPage)
    .skip(skip)
    .sort(sortObj)

  res.json({
    page,
    perPage,
    total,
    pages: calcPages(perPage, total),
    data,
  })
})

const getPortfolioById = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id)
  //console.log(portfolio)
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
  const { name, description, url, tags: tagsIds } = req.body

  let img = ""
  if (req.file) {
    img = req.file.path
  }
  let tagsObjArr
  if (tagsIds) {
    let tagsIdsArr = tagsIds.split(",")
    //console.log(tagsIdsArr)
    tagsObjArr = await Tag.find({ _id: { $in: tagsIdsArr } })
    //console.log(tagsObjArr)
    // tags = tagsObjArr.map((e) => {
    //   return {
    //     name: e.name,
    //     _id: e.id,
    //     id: e.id,
    //   }
    // })
  }

  const portfolio = new Portfolio({
    tags: tagsObjArr,
    name,
    description,
    img,
    url,
  })

  const createdPortfolio = await portfolio.save()
  res.status(201).json(createdPortfolio)
})

const updatePortfolio = asyncHandler(async (req, res) => {
  const { name, description, url, tags: tagsIds } = req.body

  let img = ""
  if (req.file) {
    img = req.file.path
  }

  let tagsObjArr
  if (tagsIds) {
    let tagsIdsArr = tagsIds.split(",")
    tagsObjArr = await Tag.find({ _id: { $in: tagsIdsArr } })
    // console.log(tagsObjArr)
  }

  const portfolio = await Portfolio.findById(req.params.id)

  if (portfolio) {
    portfolio.tags = tagsObjArr
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
