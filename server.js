const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');

const projectRoute = require('./routes/projectRoute');
const actionRoute = require('./routes/actionRoute');

const server = express();
const parser = express.json();
const logMiddleware = logger('dev');
const securityMiddleware = helmet();

server.use(parser, logMiddleware, securityMiddleware);


// import routes from users and posts
server.use('/api/projects', projectRoute);
server.use('/api/actions', actionRoute);

server.get('/', (req, res) => {
    res.send(`<h2>Welcome to the sprint challenge!</h2>`)
});

server.get('*', (req, res) => {
	res.status(404).send(`
	<h2>The link you searched for does not exist</h2>
	`)
});

module.exports = server;