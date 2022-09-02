const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HostSchema = new Schema(
  {
    title: String,
    category: String,
    owner: String,
    address: String,
    country: String,
    roomNumber: Number,
    features: [String],
    photo: String,
    price: Number,
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);


module.exports = mongoose.model("Host",HostSchema)