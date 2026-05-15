const express = require('express')

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    console.log(req.body)

    res.status(200).json({
      message: 'Result Saved Successfully',
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})

module.exports = router