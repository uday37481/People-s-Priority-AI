const mongoose = require('mongoose');

const constituencySchema = new mongoose.Schema(
  {
    constituencyName: {
      type: String,
      required: [true, 'Please add a constituency name'],
      trim: true,
      unique: true
    },
    district: {
      type: String,
      required: [true, 'Please add a district'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'Please add a state'],
      trim: true
    },
    mpName: {
      type: String,
      required: [true, 'Please add the MP name'],
      trim: true
    },
    population: {
      type: Number,
      required: [true, 'Please add the population']
    },
    area: {
      type: Number,
      required: [true, 'Please add the area in sq km']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Constituency', constituencySchema);
