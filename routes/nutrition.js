const router = require('express').Router();
let Nutrition = require('../models/nutrition.model');

router.route('/').get((req, res) => {
  Nutrition.find()
    .then(nutrition => res.json(nutrition))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const meal = req.body.meal;
  const description = req.body.description;
  const calories = Number(req.body.duration);

  const newNutrition = new Nutrition({
    meal,
    description,
    calories,
  });

  newNutrition.save()
  .then(() => res.json('Nutrition added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Nutrition.findById(req.params.id)
    .then(nutrition => res.json(nutrition))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Nutrition.findByIdAndDelete(req.params.id)
    .then(() => res.json('Nutrition deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post((req, res) => {
  Nutrition.findById(req.params.id)
    .then(nutrition => {
      nutrition.meal = req.body.meal;
      nutrition.description = req.body.description;
      nutrition.calories = Number(req.body.calories);

      nutrition.save()
        .then(() => res.json('Nutrition updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
