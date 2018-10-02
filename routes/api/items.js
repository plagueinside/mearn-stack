const express = require('express');
const router = express.Router();

const Item = require('../../core/db/models/item');

//@route GET api/items
//@desc Create A Post
//@access Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save()
        .then(item => res.json(item));
});

//@route POST api/items
//@desc Get All items
//@access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
});

//@route DELETE api/items
//@desc Delete An item
//@access Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => {
            return item.remove();
        })
        .then(() => res.json({success: true}))
        .catch(err => {
            res.status(404).json({success: false});
        });
});

module.exports = router;