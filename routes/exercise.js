const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const exerciseName = req.body.exerciseName;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const newExercise = new Exercise({
    username,
    exerciseName,
    description,
    duration,
  });

  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').put((req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  console.log(typeof Exercise.findByIdAndUpdate(req.params.id));
  Exercise.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedExercise)=>{
    console.log(updatedExercise);
    if(err) return console.log(err);
    res.status(200).json(updatedExercise)
  })
    // .then(exercise => {
    //   console.log(exercise);
    //   exercise.username = req.body.username;
    //   exercise.exerciseName = req.body.exerciseName;
    //   exercise.description = req.body.description;
    //   exercise.duration = Number(req.body.duration);
    //   exercise.save()
    //     res.json({message:'hello'})
    // })
    // .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
