const router = require('express').Router()
let Rent = require('../models/rent.model')


router.route('/').get((req, res) => {
    Rent.find()
        .then(rent => res.json(rent))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/add').post((req, res) => {
    const rentname = req.body.rentname;
    const renttype = req.body.renttype;
    const rentprice = Number(req.body.rentprice);

    const newRent = new Rent({
        rentname,
        renttype,
        rentprice,
    })

    newRent.save()
        .then(() => res.json('Rent added'))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/:id').get((req, res) => {
    Rent.findById(req.params.id)
        .then(rent => res.json(rent))
        .catch(err => res.status(400).json('Error' + err))
})
router.route('/:id').delete((req, res) => {
    Rent.findByIdAndDelete(req.params.id)
        .then(() => res.json('Rent deleted!'))
        .catch(err => res.status(400).json('Error' + err))
})

module.exports = router