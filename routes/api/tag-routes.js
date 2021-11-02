const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTagResults = await Tag.findAll({
       include:  [{ model: Product }]
      });
    res.status(200).json(allTagResults);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagResults = await Tag.findByPk(req.params.id, {
      include:  [{ model: Product }]
    });
    if (!tagResults) {
      res.status(404).json({ message: 'No Tag with this id!' });
      return;
    }
    res.status(200).json(tagResults);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTagResults = await Tag.create(req.body);
    res.status(200).json(newTagResults);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTagResults = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    }); 
    if (!updateTagResults) {
      res.status(404).json({ message: 'No Tag with this id!' });
      return;
    }

    res.status(200).json(updateTagResults);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const delTagResults = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!delTagResults) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(delTagResults);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;