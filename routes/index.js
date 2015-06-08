var express = require('express');
var router = express.Router();

//Controlador
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

router.get('/author', function(req, res) {
  res.render('author', {});
});

router.get('/quizes', quizController.index);

router.get('/quizes/show', quizController.show);
//router.get('/quizes/answer', quizController.answer);


//Autoload de todas las rutas que reciban el parámetro :quizId
router.param('quizId', quizController.load);

router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);

module.exports = router;
