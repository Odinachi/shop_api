const { Category } = require('../models/catergory')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const catergoryList = await Category.find()
    if (!catergoryList) {
        res.status(500).json({ success: false })
    }
    res.send(catergoryList)
})

router.post('/', async (req, res) => {
    const newCatergory = new Category({
        name: req.body.name,
        color: req.body.color,
        icon: req.body.icon,
    })
    newCat = await newCatergory.save()
    if (!newCat) {
        return res.status(400).send('something happened')
    }
    res.send(newCat)
})

router.delete('/:id', (req, res) => {
    const deleteItem = Category.findByIdAndRemove(req.params.id)
        .then((deleteCat) => {
            if (deleteCat) {
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

router.get('/:id', async (req, res) => {
    const currentCat = await Category.findById(req.params.id)

    if (!currentCat) {
        return res
            .status(400)
            .json({ success: false, message: "could'nt find" })
    }

    res.send(currentCat)
})
router.put('/:id', async (req, res) => {
    const newname = req.body.name
    const newicon = req.body.icon
    const newcolor = req.body.color

    const updateCat = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: newname,
            color: newicon,
            icon: newcolor,
        },
        { new: true }
    )
    console.log(`cat ${updateCat}`)
    if (!updateCat) {
        return res.status(400).send({ success: false })
    }
    res.send(updateCat)
})

module.exports = router
