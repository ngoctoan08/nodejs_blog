class NewsController
{
    //GET /news
    index(req, res) {
        // res.send('toandeptrai');
        res.render('news'); //goi den views
    }
}

module.exports = new NewsController;