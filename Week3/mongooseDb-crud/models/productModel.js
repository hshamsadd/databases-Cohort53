import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please enter product name"] },
    quantity: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    inStock: { type: Boolean, default: true },
    image: { type: String, required: false }, // could also add `match` for URL validation
  },
  { timestamps: true } // auto adds createdAt & updatedAt
);

const Product = mongoose.model("Product", ProductSchema);

// Export model
export default Product;
