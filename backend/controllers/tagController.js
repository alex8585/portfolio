import asyncHandler from "express-async-handler"
import Tag from "../models/tagModel.js"

const getTags = asyncHandler(async (req, res) => {
  const { perPage, sortObj, filterObj, skip } = req.mongoParams

  const total = await Tag.countDocuments(filterObj)
  const data = await Tag.find(filterObj).limit(perPage).skip(skip).sort(sortObj)

  res.json({
    total,
    data,
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
