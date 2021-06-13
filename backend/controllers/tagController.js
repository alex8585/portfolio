import asyncHandler from "express-async-handler"
import Tag from "../models/tagModel.js"

const getTags = asyncHandler(async (req, res) => {
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

  const count = await Tag.countDocuments(keyword)
  const tags = await Tag.find(keyword)
    .limit(perPage)
    .skip(perPage * (page - 1))
    .sort(sortObj)

  res.json({
    total: count,
    data: tags,
  })
})

const getTagById = asyncHandler(async (req, res) => {
  const tag = await Tag.findById(req.params.id)

  if (tag) {
    res.json(tag)
  } else {
    res.status(404)
    throw new Error("Tag not found")
  }
})

const deleteTag = asyncHandler(async (req, res) => {
  let ids = false
  if (req.query.filter) {
    const filter = JSON.parse(req.query.filter)
    ids = filter.id
  }

  if (ids) {
    const result = await Tag.deleteMany({ _id: { $in: ids } })
    if (result.ok) {
      res.json({ data: ["Tag removed"] })
    } else {
      res.status(404)
      throw new Error("Tag not found")
    }
    return
  }

  const tag = await Tag.findById(req.params.id)

  if (tag) {
    await tag.remove()
    res.json({ data: ["Tag removed"] })
  } else {
    res.status(404)
    throw new Error("Tag not found")
  }
})

const createTag = asyncHandler(async (req, res) => {
  const { name } = req.body

  const tag = new Tag({
    name,
  })

  const createdTag = await tag.save()
  res.status(201).json(createdTag)
})

const updateTag = asyncHandler(async (req, res) => {
  const { name } = req.body

  const tag = await Tag.findById(req.params.id)

  if (tag) {
    tag.name = name
    const updatedTag = await tag.save()
    res.json(updatedTag)
  } else {
    res.status(404)
    throw new Error("Tag not found")
  }
})

export { getTags, getTagById, deleteTag, createTag, updateTag }
