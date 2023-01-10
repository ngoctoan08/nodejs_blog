const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const route = require('./routes/index');
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middlewares/SortMiddleware')

//Connect DB
const db = require('./config/db/index');
db.connect();
const app = express();
const port = 3000;

//Use SCSS
//Set up status file
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

//Method Overide
app.use(methodOverride('_method'));

// Custom Middle ware
app.use(SortMiddleware);

//template engine
// Register `hbs.engine` with the Express app.
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: { sum: (a, b) => a + b ,
        sortable: (field, sort) => {
            currentType = field === sort.column ? sort.type : 'default';

            // List icon
            const icons = {
                default: 'fa-solid fa-sort',
                asc: 'fa-solid fa-sort-up',
                desc: 'fa-solid fa-sort-down',
            }

            // List type
            const types = {
                default: 'desc',
                asc: 'desc',
                desc: 'asc',
            }

            const icon = icons[currentType];
            const type = types[currentType];

            return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a>`;
        }
    }
    }),
);

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//routes init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
