const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    review: String,
    rating: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'private'
    }

}, {
    timestamps: true
})

const itemSchema = new Schema({
    name: {
        type: String
    },
    brand: String,
    description: String,
    price: Number,
    quantity: Number,
    color: String,
    origin: String,
    warrenty: {
        warrentyStatus: { type: Boolean, default: false },
        warrentyPeriod: String
    },
    manuDate: Date,
    weight: Number,
    image: String,
    tags: [String],
    discount: {
        discountedItem: { type: Boolean, default: false },
        discount: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'private'
    },
    returnLimit: { type: String },
    reviews: [reviewSchema]

}, {
    timestamps: true
})
itemModel = mongoose.model('item', itemSchema);
itemModel.syncIndexes()
module.exports = itemModelN