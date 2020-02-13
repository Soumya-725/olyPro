const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const cors = require('cors')
const corsConfig = {
                  origin: 'http://localhost:4200',
                  optionsSuccessStatus: 200
                }

const dotenv = require('dotenv');
const app = express();
dotenv.config();


const apiAllRoutes = require('./routes/apiRoutes');

app.use(cors(corsConfig))
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api', apiAllRoutes);


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening port is ${ port }`);
});