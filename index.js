const express = require('express')
const app = express()
const port = 3000

// import library CORS
const cors = require('cors')

// use cors middle
app.use(cors())

// import body parser
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// routes for hello world
app.get('/', (req, res) => {
  res.send('Hello world')
})

// import route posts
const postsRouter = require('./routes/posts');
app.use('/api/posts', postsRouter);

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`)
})