var path = require('path');

//Cargar ORM
var Sequelize = require('sequelize');

//Usar bdd
var db = new Sequelize(null, null, null, 
						{ dialect: "sqlite", storage: "quiz.sqlite" });

//Importar definición de quiz.js
var Quiz = db.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz;

//Inicializar tabla
db.sync().success(function() {
	Quiz.count().success(function(count){
		if (count===0) {
			Quiz.create({pregunta:'Capital de Italia', respuesta:'Roma'})
				.success(function() { console.log('BD Inicializada') });
		}
	});
});