var express = require('express');
var router = express.Router();

//Controlador
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/author', function(req, res) {
  res.render('author', {});
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);
router.get('/author', quizController.answer);

module.exports = router;
