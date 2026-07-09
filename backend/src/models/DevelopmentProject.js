const mongoose = require('mongoose');

const developmentProjectSchema = new mongoose.Schema(
  {
    constituencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Constituency',
      required: [true, 'Please associate a constituency with this project']
    },
    projectTitle: {
      type: String,
      required: [true, 'Please add a project title'],
      trim: true
    },
    category: {
      type: String,
      enum: ['Road', 'Water', 'Education', 'Healthcare', 'Agriculture', 'Employment', 'Sanitation', 'Electricity', 'Other'],
      required: [true, 'Please select a category']
    },
    estimatedBudget: {
      type: Number,
      required: [true, 'Please specify the estimated budget']
    },
    status: {
      type: String,
      enum: ['Proposed', 'Approved', 'Ongoing', 'Completed'],
      default: 'Proposed'
    },
    description: {
      type: String,
      required: [true, 'Please add a description']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('DevelopmentProject', developmentProjectSchema);
