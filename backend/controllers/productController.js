import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const { perPage, sortObj, filterObj, skip } = req.mongoParams

  const total = await Product.countDocuments(filterObj)
  const data = await Product.find(filterObj)
    .limit(perPage)
    .skip(skip)
    .sort(sortObj)

  res.json({
    total,
    data,
  })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  let ids = false
  if (req.query.filter) {
    const filter = JSON.parse(req.query.filter)
    ids = filter.id
  }

  if (ids) {
    const result = await Product.deleteMany({ _id: { $in: ids } })
    if (result.ok) {
      res.json({ data: ["Product removed"] })
    } else {
      res.status(404)
      throw new Error("Product not found")
    }
    return
  }

  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ data: ["Product removed"] })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, brand, category, countInStock, user } =
    req.body

  const product = new Product({
    name,
    price,
    user,
    image: "/images/sample.jpg",
    brand,
    category,
    countInStock,
    numReviews: 0,
    description,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    user,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    product.user = user
    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error("Product already reviewed")
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: "Review added" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
}
