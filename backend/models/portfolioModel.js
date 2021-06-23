import mongoose from "mongoose"

const tagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    order_number: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

tagSchema.virtual("id").get(function () {
  return this._id.toHexString()
})

// tagSchema.virtual("id").get(function () {
//   return this._id.toHexString()
// })

const portfolioSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    img: {
      type: String,
    },
    url: {
      type: String,
    },
    tags: [tagSchema],
    order_number: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

portfolioSchema.virtual("id").get(function () {
  return this._id.toHexString()
})
portfolioSchema.virtual("fullImg").get(function () {
  if (!this.img) {
    return
  }
  const PORT = process.env.PORT || 5000
  const HOST = process.env.HOST || "http://localhost"
  return `${HOST}:${PORT}/${this.img}`
})
const Portfolio = mongoose.model("Portfolio", portfolioSchema)

export default Portfolio
