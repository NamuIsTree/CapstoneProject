const request = require('request');
const mysql   = require('mysql');
const date    = require('date-utils');
const cron    = require('node-cron');

const url = 'http://api.openweathermap.org/data/2.5/weather?lat=37.57&lon=126.98&APPID=';
const key = 'a6b981c458c02b9c1e20b0576cebae2e';

cron.schedule('0,10,20,30,40,50 * * * *', () => {
request.get(url + key, (err, res, body) => {
	if (err)
		console.log(`err => ${err}`);
	else {
		var obj = JSON.parse(body);
		var temp = obj.main.temp - 273.15;
		var dt = new Date(obj.dt * 1000);
		dt.add({hours: 9});

		console.log('city = ' + obj.name);
		console.log('temp = ' + temp);
		console.log('date = ' + dt.toFormat('YYYY-MM-DD HH24:MI:SS'));

		var connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '1q2w3e4r!',
			database: 'tenki'
		})
		connection.connect();

		// save to db.

		var query = connection.query("insert into weather (temp) values (" + temp + ")", function (err, rows, cols) {
			if (err) throw err;
			console.log("done");
		});

		// send data to thingspeak.

		var getUrl = 'https://api.thingspeak.com/update?api_key=P03ABWFQNEZU6DB2&field1=' + temp;
		request.get({
			url : getUrl
		}, function(err, response, body) {
			if (err) {
				console.log('Error occurred when data is sent to thingspeak.');
			}
			console.log("Data is sent to thingspeak completely.");

		});
	}
})
})
