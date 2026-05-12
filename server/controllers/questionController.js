const Question = require('../models/Question')

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find()

    res.status(200).json(questions)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

const addQuestion = async (req, res) => {
  try {
    const { question, options, answer } = req.body

    const newQuestion = await Question.create({
      question,
      options,
      answer,
    })

    res.status(201).json(newQuestion)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = {
  getQuestions,
  addQuestion,
}