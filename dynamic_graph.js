var express = require('express')
var date = require('date-utils');
var app = express()
fs = require('fs');
mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1q2w3e4r!',
    database: 'tenki'
})
connection.connect();


app.get('/graph', function (req, res) {
    console.log('got app.get(graph)');
    var html = fs.readFile('./graph.html', function (err, html) {
    html = " "+ html
    console.log('read file');

    var qstr = 'select * from weather ';
    connection.query(qstr, function(err, rows, cols) {
      if (err) throw err;

      var data = "";
      var comma = ""
      for (var i=0; i < 288; i++) {
         r = rows[i];
	 var ddate = new Date(r.date);
	 ddate.add({hours: 9});

	 var yy = ddate.getFullYear();
	 var mo = ddate.getMonth();
	 var dd = ddate.getDate();
	 var hh = ddate.getHours();
	 var mi = ddate.getMinutes();

         data += comma + "[new Date(" + yy + "," + mo + "," + dd + "," +  hh + "," + mi + ",00,00),"+ r.temp +"]";
         comma = ",";
      }
      var header = "data.addColumn('date', 'Date/Time');"
      header += "data.addColumn('number', 'Temp');"
      html = html.replace("<%HEADER%>", header);
      html = html.replace("<%DATA%>", data);

      res.writeHeader(200, {"Content-Type": "text/html"});
      res.write(html);
      res.end();
    });
  });
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('listening at http://%s:%s', host, port)
});
