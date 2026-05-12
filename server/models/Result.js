// models/Result.js

const mongoose =
  require('mongoose')

const resultSchema =
  new mongoose.Schema({
    studentName: String,

    email: String,

    score: Number,

    totalQuestions: Number,

    warnings: Number,

    submittedAt: {
      type: Date,
      default: Date.now,
    },
  })

module.exports =
  mongoose.model(
    'Result',
    resultSchema
  )