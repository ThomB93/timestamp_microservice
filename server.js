// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//timestamp route
app.get("/api/timestamp/:date_string?", function(req, res) {
  var input = req.params.date_string;
  var date = null;
  if(req.params.date_string) {
    try {
      if(isNaN(Number(input))) {
        date = new Date(input); //input is utc time
        console.log(date);
        if(isNaN(date.valueOf())) {
          res.json({"error" : "Invalid Date" })
        }
      } else {
        date = new Date(parseInt(input)); //input is unix time
      }
    } catch (err) {
      res.json({"error" : "Invalid Date" })
    }
  } else if(req.params.date_string === undefined) {
    date = new Date();
  }
  res.json({"unix": date.getTime(), "utc": date.toUTCString()})
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
