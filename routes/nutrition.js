const router = require('express').Router();
let Nutrition = require('../models/nutrition.model');

router.route('/').get((req, res) => {
  Nutrition.find()
    .then(nutrition => res.json(nutrition))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const meal = req.body.meal;
  const description = req.body.description;
  const calories = Number(req.body.calories);
  const newNutrition = new Nutrition({
    username,
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
router.route('/update/:id').put((req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  console.log(typeof Nutrition.findByIdAndUpdate(req.params.id));
  Nutrition.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedNutrition)=>{
    console.log(updatedNutrition);
    if(err) return console.log(err);
    res.status(200).json(updatedNutrition)
  })
    // .then(nutrition => {
    //   console.log(nutrition);
    //   nutrition.username = req.body.username;
    //   nutrition.meal = req.body.meal;
    //   nutrition.description = req.body.description;
    //   nutrition.calories = Number(req.body.calories);
    //   nutrition.save()
    //     res.json({message:'hello'})
    // })
    // .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
