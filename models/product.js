const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    decription: { type: String, required: true },
    richDescription: { type: String, default: '' },
    image: { type: String, default: '' },
    images: [{ type: String, default: '' }],
    brand: { type: String, default: '' },
    price: { type: Number, default: 0 },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    countInStock: { type: Number, min: 0, max: 255 },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    dateCreated: { type: Date, default: Date.now },
})

exports.Product = mongoose.model('Products', productSchema)
