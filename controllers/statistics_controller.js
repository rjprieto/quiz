var models = require('../models/models.js');

//GET /quizes/statistics
exports.show = function (req, res) {
	var numPreguntas = 0;
	var numComentarios = 0;
	var mediaComentarios = 0.0;
	var numSinComentarios = 0;
	var numConComentarios = 0;

	models.Quiz.count().then( function (num) {
		numPreguntas = num;
		models.Comment.count().then( function (num) {
			numComentarios = num;

			if (numPreguntas > 0) {
				mediaComentarios = numComentarios / numPreguntas;
			}

			models.Quiz.findAll(
							{
								attributes: ["Quizzes.id"],
								distinct: true,
								include: [{model: models.Comment, required: true }]
								//,group: 'Quizzes.id'
							}
				).then( function (result) {
				
					numConComentarios = result.length;
					numSinComentarios = numPreguntas - numConComentarios;
					
					res.render('quizes/statistics', { data : [numPreguntas,
												numComentarios,
												mediaComentarios,
												numSinComentarios,
												numConComentarios] , errors: []});
			}).catch(function(error) { next(error) });
		}).catch(function(error) { next(error) });
	}).catch(function(error) { next(error) });

}