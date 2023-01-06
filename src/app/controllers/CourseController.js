const { mutipleMongooseToObject } = require("../../helper/mongoose");
const Course = require("../models/Course");

class CourseController {
    //GET /course
    index(req, res, next) {
        Course.find({}).lean() //neu 
            .then(courses => {
                res.render('course/index', {
                    courses, 
                })
            });
    }

    // GET /course/edit/:id
    edit(req, res, next) {
        Course.findById(req.params.id).lean()
            .then(course => {
                res.render('course/edit', {
                    course
                })
            })
            .catch(next)
    }

    // PUT /course/:id
    update(req, res, next) {
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/course'))
            .catch(next)
    }

    // POST /course/:id
    delete(req, res, next) {
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/course'))
            .catch(next)
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
            .catch(next)
    }
}

module.exports = new CourseController();
