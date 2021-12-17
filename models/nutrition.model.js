const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nutritionSchema = new Schema({
  username: { type: String, required: true },
  meal: { type: String, required: true },
  description: { type: String, required: true },
  calories: { type: Number },
})

const Nutrition = mongoose.model('Nutrition', nutritionSchema);

module.exports = Nutrition;
