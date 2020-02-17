const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const corsConfig = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
const app = express()
const apiAllRoutes = require('./routes/apiRoutes')

app.use(cors(corsConfig))
app.use(morgan('dev'));
app.use('/api', apiAllRoutes)

const port = 8080
app.listen(port, () => {
  console.log(`Listening port is ${port}`)
});