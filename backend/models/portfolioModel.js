import mongoose from "mongoose"

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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

portfolioSchema.virtual("id").get(function () {
  return this._id.toHexString()
})

const Portfolio = mongoose.model("Portfolio", portfolioSchema)

export default Portfolio
