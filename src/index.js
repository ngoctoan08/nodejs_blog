const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const route = require('./routes/index');

const app = express();
const port = 3000;

//USE SCSS
//CAI DAT FILE TINH
app.use(express.static(path.join(__dirname, 'public')));

//MiddleWare de xu ly form gui len
app.use(
              express.urlencoded({
                  extended: true,
    }),
); //xu ly o dang form tu serve
app.use(express.json()); //xu ly cac thu vien cua js
//HTTP logger
app.use(morgan('combined'));

//template engine
// Register `hbs.engine` with the Express app.
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
    }),
);

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//routes init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
