var models = require('../models/models.js');

//Autoload :id de comentarios
exports.load = function (req, res, next, commentId ) {
	models.Comment.find( {
						where: { id: Number(commentId) }
					  }
					)
	.then(
		function(comment) {
			if (comment) {
				req.comment = comment;
				next();
			}
			else {
				next(new Error('No existe commentId=' + commentId));
			}
		}
	).catch(function(error) { next(error) });
}

//GET /quizes/:quizId(\\d+)/comments/new
exports.new = function (req, res) {
	res.render('comments/new.ejs', {quizid: req.params.quizId, errors: []});
}

//POST /quizes/:quizId(\\d+)/comments
exports.create = function (req, res) {
	var comment = models.Comment.build( {texto: req.body.comment.texto, QuizId:req.params.quizId} );

	var e = comment.validate();
	var errors = [];
	
	if (e) {
		errors.push(e);
		res.render('quizes/new', {comment: comment, quizid:req.params.quizId, errors: errors});
	} 
	else {
		comment.save().then( function() {
			res.redirect("/quizes/" + req.params.quizId);
		});
	};
}

//GET /quizes/:quizId/comments/:commentId/publish
exports.publish = function (req, res) {
	req.comment.publicado = true;
	console.log("SALVANDO");
	req.comment.save( {fields: ['publicado']} ).then( function() {
			console.log("SALVADO");
			res.redirect("/quizes/" + req.params.quizId);
		})
		.catch(function(error) { next(error) });

}