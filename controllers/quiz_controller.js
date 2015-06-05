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
  var params = {};
  
  if (req.query.search) {
	var searchString = "%" + req.query.search + "%";
	searchString = searchString.replace(/ /g, "%");
	console.log(searchString);
	
	params = {
		where: ["pregunta like ?", searchString],
		order: 'pregunta ASC'
	};
  }
  
  models.Quiz.findAll(params).then(function(quizes) {
			res.render('quizes/index', {quizes : quizes});
		});
}

//GET /quizes/show
exports.show = function (req, res) {
	res.render('quizes/show', {quiz : req.quiz});

}

//GET /quizes/answer
exports.answer = function (req, res) {
	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta) {
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz:req.quiz, respuesta : resultado});
}