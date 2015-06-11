﻿var models = require('../models/models.js');

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
