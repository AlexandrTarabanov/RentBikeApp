const router = require('express').Router()
let Bike = require('../models/bike.model')


router.route('/').get((req, res) => {
    Bike.find()
        .then(bike => res.json(bike))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/add').post((req, res) => {
    const bikename = req.body.bikename;
    const biketype = req.body.biketype;
    const bikeprice = Number(req.body.bikeprice);

    const newBike = new Bike({
        bikename,
        biketype,
        bikeprice,
    })

    newBike.save()
        .then(() => res.json('Bike added'))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/:id').get((req, res) => {
    Bike.findById(req.params.id)
        .then(bike => res.json(bike))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/:id').delete((req, res) => {
    Bike.findByIdAndDelete(req.params.id)
        .then(() => res.json('Bike deleted!'))
        .catch(err => res.status(400).json('Error' + err))
})

module.exports = router