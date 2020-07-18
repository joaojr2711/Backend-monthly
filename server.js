require('dotenv').config();

const express = require('express');
const cors = require('cors');
// const morgan = require('morgan');
const routes = require('./src/routes');

// const mongodb = require('./src/db/conect')

const app = express();

app.use(cors());
// app.use(morgan("dev"));
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, () =>{
  console.log('Aplication run in PORT:', process.env.PORT)
}); 