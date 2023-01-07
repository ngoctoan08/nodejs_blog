const { mutipleMongooseToObject } = require('../../helper/mongoose');
const Course = require('../models/Course');

class CourseController {
    //GET /course/
    index(req, res, next) {
        Course.find({})
            .lean() //neu
            .then((courses) => {
                res.render('course/index', {
                    courses,
                });
            });
    }

    // GET /course/trash
    trash(req, res, next) {
        Course.findDeleted({})
            .lean() //neu
            .then((courses) => {
                res.render('course/trash', {
                    courses,
                });
            });
    }

    // GET /course/edit/:id
    edit(req, res, next) {
        Course.findById(req.params.id)
            .lean()
            .then((course) => {
                res.render('course/edit', {
                    course,
                });
            })
            .catch(next);
    }

    // PUT /course/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/course'))
            .catch(next);
    }

    // DELETE /course/:id
    delete(req, res, next) {
        Course.delete({_id: req.params.id})
            .then(() => res.redirect('/course'))
            .catch(next);
    }

    // GET course/create
    create(req, res) {
        res.render('course/create'); //goi den views
    }

    //POST course/store
    store(req, res, next) {
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/course'))
            .catch(next);
    }
}

module.exports = new CourseController();
