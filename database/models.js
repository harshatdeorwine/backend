const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const postSchema = new Schema(
  {
    description: String,
    avg_rating: Number,
  },
  {
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const customerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

const postRatingSchema = new Schema(
  {
    post_id: Types.ObjectId,
    rating: Number,
    user_name: String,
  },
  {
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const webhookSchema = new Schema(
  {
    source: String, // admitad, flipkart
    type: String, // program, action
    values: Object,
  },
  {
    toObject: { virtuals: true },
    timestamps: true,
  }
);

exports.Customers = mongoose.model("Customers", customerSchema);
exports.post = mongoose.model("posts", postSchema);
exports.User = mongoose.model("user", userSchema);
exports.postRating = mongoose.model("posts.ratings", postRatingSchema);
exports.webhook = mongoose.model("webhooks", webhookSchema);
