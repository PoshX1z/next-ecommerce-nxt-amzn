import { Document, Model, model, models, Schema } from "mongoose";
import { IProductInput } from "@/types";

//Iproduct extends of these in order to store in mongodb and have addtional properties like _id, createdAt, updatedAt for mongodb.
export interface IProduct extends Document, IProductInput {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

//This creates a mongoose schema with specific fields and data types that we provide. (Actual schema used in MongoDB via Mongoose)
const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    images: [String],
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    listPrice: {
      type: Number,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    tags: { type: [String], default: ["new arrival"] },
    colors: { type: [String], default: ["White", "Red", "Black"] },
    sizes: { type: [String], default: ["S", "M", "L"] },
    avgRating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    ratingDistribution: [
      {
        rating: {
          type: Number,
          required: true,
        },
        count: {
          type: Number,
          required: true,
        },
      },
    ],
    numSales: {
      type: Number,
      required: true,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Creating the mongoose model. If a Product model already exists, use it. Otherwise, create a new model using ProductSchema.
const Product =
  (models.Product as Model<IProduct>) ||
  model<IProduct>("Product", productSchema);

export default Product; //Now Product is the final result that we're gonna seed into database.
