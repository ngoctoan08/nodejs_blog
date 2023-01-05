const { mutipleMongooseToObject } = require("../../helper/mongoose");
const Course = require("../models/Course");

class CourseController {
    //GET /course
    index(req, res, next) {
        Course.find({})
            .then(courses => {
                res.render('course/index', {
                    courses
                })
            });
    }


    // GET create
    create(req, res) {
        res.render('course/create'); //goi den views
    }

    //POST store
    store(req, res, next) {
        const course = new Course(req.body);
        course.save()
            .then(() => res.redirect('/course'))
    }
}

module.exports = new CourseController();
