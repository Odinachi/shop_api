const express = require('express')
const { Product } = require('../models/product')
const { Category } = require('../models/catergory')
const router = express.Router()
const mongoose = require('mongoose')

router.get(`/`, async (req, res) => {
    let filter = {}

    if (req.query.categories) {
        filter = { category: req.query.categories.split(',') }
    }
    const productList = await Product.find(filter).populate('category')
    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList)
})

router.get(`/:id`, async (req, res) => {
    const currentProduct = await Product.findById(req.params.id).populate(
        'category'
    )
    if (!currentProduct) {
        res.status(500).json({ success: false })
    }
    res.send(currentProduct)
})

router.post(`/`, async (req, res) => {
    const cat = await Category.findById(req.body.category)

    if (!cat) return res.status(400).send('invalid category')
    const product = new Product({
        name: req.body.name,
        decription: req.body.decription,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        dateCreated: req.body.dateCreated,
    })
    newprod = await product.save()
    if (!newprod) {
        return res.status(500).send('something happened')
    }
    res.send(newprod)
})

router.put(`/:id`, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res
            .status(400)
            .json({ success: false, error: 'id cannot be validated' })
    }
    const cat = await Category.findById(req.body.category)

    if (!cat) return res.status(400).send('invalid category')
    const prodUpdate = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            decription: req.body.decription,
            richDescription: req.body.richDescription,
            image: req.body.image,
            images: req.body.images,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
            dateCreated: req.body.dateCreated,
        },
        { new: true }
    )

    if (!prodUpdate) {
        return res.status(500).send('something happened')
    }
    res.send(prodUpdate)
})

router.delete('/:id', (req, res) => {
    const deleteItem = Product.findByIdAndRemove(req.params.id)
        .then((deleteprod) => {
            if (deleteprod) {
                return res
                    .status(200)
                    .json({ success: true, message: 'deleted' })
            } else {
                return res
                    .status(404)
                    .json({ success: false, message: 'category not found' })
            }
        })
        .catch((err) => res.status(200).json({ success: false, error: err }))
})
router.get('/get/count', async (req, res) => {
    const countProduct = await Product.countDocuments()
    if (!countProduct) {
        res.status(500).json({ success: false })
    }
    res.send({ count: countProduct })
})

router.get('/get/featured/:count?', async (req, res) => {
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({ isFeatured: true }).limit(+count)
    if (!products) {
        res.status(500).json({ success: false })
    }
    res.send(products)
})

module.exports = router
