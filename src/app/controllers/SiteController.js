const Course = require('../models/Courses');
const { mutipleMongooseToObject } = require('../../helper/mongoose');
class SiteController {
    index(req, res, next) {
        // Viet theo cach call back
        // Course.find({}, function(err, courses) {
        //     if(!err) {
        //         res.json(courses);
        //     }
        //     else {
        //         res.status(400).json({error: 'message'});
        //     }
        // });

        //Viet theo cach promises
        Course.find({})
            .then((courses) => res.render('home', { courses }))
            .catch(next);
        // res.render('home');
    }
}

module.exports = new SiteController();
