const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

module.exports = () => {
	const app = express();

	app.set('port', process.env.PORT || config.get('server.port'));

	app.use(bodyParser.json());

	// visualizar página html
	app.use(express.json());
	app.use(express.static('public'));

	require('../routes/routes')(app);

	return app;
};
