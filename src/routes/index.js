const newsRouter = require('./news');
const siteRouter = require('./sites');
const courseRouter = require('./course');

function route(app) {
    app.get('/home', (req, res) => {
        // around function
        res.render('home');
    });
    // app.get('/news', (req, res) => { // around function
    //     res.send('toandeptrai!')
    // })

    //su dung MVC
    //goi den path news
    app.use('/news/', newsRouter);

    //goi den path home
    app.use('/', siteRouter);

    // app.use('course', )
    app.use('/course/', courseRouter);
}

module.exports = route;
