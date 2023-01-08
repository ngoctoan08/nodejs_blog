const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/', courseController.index);

router.get('/create', courseController.create);

router.get('/:id/edit', courseController.edit);

router.post('/handle-action', courseController.handleAction);

router.put('/:id/', courseController.update);

router.delete('/:id/', courseController.delete);

router.post('/store', courseController.store);

router.get('/trash', courseController.trash);
module.exports = router;
