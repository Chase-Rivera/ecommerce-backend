const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const results = await Tag.findAll({ include: Product });
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const results = await Tag.findByPk(req.params.id, {include: Product});
    if (!results) {
      res.status(404).json({ message: 'No Tag with this id!' });
      return;
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const results = await Tag.create(req.body);
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const results = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    }); res.status(200).json("Tag name edited");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;