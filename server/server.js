require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors());
app.use(cookieParser())

/* settings */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

/* ejs */
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'))
app.set('layout',  path.join(__dirname + '/views/layouts/main'))

/* routes */
app.use(require('./routes/main.routes'));

/* listener */
app.listen(process.env.PORT, () => {
  console.clear();
  console.log(`http://localhost:${process.env.PORT}`);
})
