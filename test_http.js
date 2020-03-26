const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const date = require('date-utils');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

// code starts

function getUserIP(req) {
	const addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	var str_addr = addr.toString();
	var st = str_addr.lastIndexOf(":");
	const ret_addr = str_addr.substring(st + 1);
	return ret_addr;
}

function getUserDate() {
	var dt = new Date();
	dt.add({hours: 9});
	return dt.toFormat('YYYY-MM-DD HH24:MI:SS');
}

function additional(obj, req) {
	obj.email = 'woonikim@naver.com';
	obj.stuno = '20151532';
	obj.time  = getUserDate();
	obj.ip    = getUserIP(req);
}

/* **** GET **** */
app.get('/capstone2020', function(req, res) {
	var parsedUrl = url.parse(req.url);
	var parsedQuery = querystring.parse(parsedUrl.query, '&', '=');

	var pathname = url.parse(req.url).pathname;

	console.log(pathname);

	additional(parsedQuery, req);

	var json = JSON.stringify(parsedQuery);
	console.log(parsedQuery);
	res.send(json);
});

app.get('/capstone2020/:a/:b', function(req, res) {
	var a = req.params.a;
	var b = req.params.b;

	var json = new Object();
	json.a = a;
	json.b = b;

	additional(json, req);

	var Json = JSON.stringify(json);
	console.log(json);
	res.send(Json);

});

/* **** POST **** */
app.post('/capstone2020', function(req, res) {
	
	additional(req.body, req);
	
	console.log(`statusCode: ${res.statusCode}`);
	console.log(req.body);
	res.send(JSON.stringify(req.body));
});

http.createServer(app).listen(8000, function() {
	console.log('Server is Running...');
});
