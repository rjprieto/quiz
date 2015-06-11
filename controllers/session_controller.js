﻿
//GET /login		Formulario de login
exports.new = function (req, res) {
	var errors = req.session.errors || {};
	req.session.errors = {};
	
	res.render('sessions/new', {errors: errors});
};

//POST /login		Crear la sesión
exports.create = function (req, res) {
	var login = req.body.login;
	var password = req.body.password;

	var userController = require('./user_controller');
	
	userController.autenticar( login, password, 
		function (error, user) {
			if(error) {
				req.session.errors = [{"message": "" + error}];
				res.redirect('/login');
				return;
			}
			
			req.session.user = { id:user.id, username: user.username};
			console.dir(req.session);
			res.redirect(req.session.redir.toString());
	});
}

//GET /logout		Destruir sesión
exports.destroy = function (req, res) {
	delete req.session.user;
	res.redirect(req.session.redir.toString());
}
