const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCatResults = await Category.findAll({ 
      include: [{ model: Product }] 
    });
    res.status(200).json(allCatResults);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catResults = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!results) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(catResults);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCatResults = await Category.create(req.body);
    res.status(200).json(newCatResults);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCatResults = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    })

    if (!updatedCatResults) {
      res.status(404).json({ message: "No category with this ID found." });
      return;
    }

    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const delCatResults = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!delCatResults) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json('Category Deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
