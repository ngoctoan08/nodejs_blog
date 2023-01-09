const { json } = require('express');
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

    // DELETE /course/:id use soft delete
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('/course'))
            .catch(next);
    }

    deleteForever(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/course'))
            .catch(next);
    }

    // DELETE /course/:id/delete_f

    // GET /course/:id use restore
    restore(req, res, next) {
        // res.json(req.body);
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
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

    //POST course/handle-action
    handleAction(req, res, next) {
        // res.json(req.body);
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseId } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Course.restore({ _id: { $in: req.body.courseId } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'delete_f':
                Course.deleteMany({ _id: { $in: req.body.courseId } })   
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json('Invalid Action');
                break;
        }
    }
}

module.exports = new CourseController();
