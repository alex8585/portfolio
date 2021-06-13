import mongoose from "mongoose"

const tagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

tagSchema.virtual("id").get(function () {
  return this._id.toHexString()
})

const Tag = mongoose.model("Tag", tagSchema)

export default Tag
