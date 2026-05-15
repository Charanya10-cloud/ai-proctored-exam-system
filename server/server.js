const resultRoutes = require('./routes/resultRoutes')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const authRoutes = require('./routes/authRoutes')
const app = express()
const questionRoutes = require('./routes/questionRoutes')
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/questions', questionRoutes)
app.use('/api/results', resultRoutes)
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Backend Running')
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})