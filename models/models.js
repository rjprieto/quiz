var path = require('path');
var env = require('node-env-file');

env(__dirname + '/../.env');

//Postgres DATABASE_URL = postgres://user:passwd@host:port/database
//SQLite DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//Cargar ORM
var Sequelize = require('sequelize');

//Usar bdd
var db = new Sequelize(DB_name, user, pwd, 
	{ dialect: dialect, 
	  protocol: protocol,
	  port: port,
	  host: host,
	  storage: storage, //solo SQLite
	  omitNull: true	//Solo postgres
	 });

//Importar definicion de quiz.js
var Quiz = db.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz;

//Inicializar tabla
db.sync().success(function() {
	Quiz.count().success(function(count){
		if (count===0) {
			Quiz.create({pregunta:'Capital de Italia', respuesta:'Roma', tema:'Humanidades'});
			Quiz.create({pregunta:'Capital de España', respuesta:'Madrid', tema:'Humanidades'});
			Quiz.create({pregunta:'Capital de Alemania', respuesta:'Berlin', tema:'Humanidades'});
			Quiz.create({pregunta:'Capital de Portugal', respuesta:'Lisboa', tema:'Humanidades'})
				.success(function() { console.log('BD Inicializada') });
		}
	});
});