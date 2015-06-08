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
		where: ["lower(pregunta) like ?", searchString.toLowerCase()],
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

//GET /quizes/new
exports.new = function (req, res) {
	var quiz = models.Quiz.build( {pregunta:'Pregunta', respuesta:'Respuesta'} );
	res.render('quizes/new', {quiz:quiz});
}

//POST /quizes/create
exports.create = function (req, res) {
	var quiz = models.Quiz.build( req.body.quiz );
	
	quiz.save( {fields: ["pregunta", "respuesta"]}).then( function() {
		res.redirect("/quizes");
	});
}