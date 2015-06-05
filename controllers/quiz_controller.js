var models = require('../models/models.js');

//Autoload
exports.load = function (req, res, next, quizId ) {
	models.Quiz.find(quizId).then(
		function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			}
			else {
				next(new Error('No existe quizId=' + quizId));
			}
		}
	).catch(function(error) { next(error) });
}

//GET /quizes
exports.index = function(req, res) {
  models.Quiz.findAll().then(function(quizes) {
			res.render('quizes/index', {quizes : quizes});
		});
}

//GET /quizes/show
exports.show = function (req, res) {
	//res.render('quizes/show', {pregunta : 'Capital de Italia'});
	//models.Quiz.find(req.params.quizId).then(
	//	function(quiz) {
			res.render('quizes/show', {quiz : req.quiz});
//		});
}

//GET /quizes/answer
exports.answer = function (req, res) {
	//models.Quiz.find(req.params.quizId).then(
		//function(quiz) {
			//if (req.query.respuesta === 'Roma') {
			var resultado = 'Incorrecto';
			if (req.query.respuesta === req.quiz.respuesta) {
				resultado = 'Correcto';
				//res.render('quizes/answer', {quiz:quiz, respuesta : 'Correcto'});
			}
			//else {
			res.render('quizes/answer', {quiz:req.quiz, respuesta : resultado});
			//}
	//});
}