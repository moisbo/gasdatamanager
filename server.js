var express = require('express');
var engine = require('ejs-locals');
var csvrawModel = require('./models/csvraw');
var csvData = require('./csv-data');

var app = express();

app.engine('ejs', engine);
app.set('views', __dirname);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/api/csvraw', function (req, res) {
    csvData.findCsvraw().then(function(collection){
        res.send(collection);
    });
});
app.get('*', function(req, res){
    res.render('index');
});

var mongoCon = "mongodb://moisbo:moisbo@ds043082.mongolab.com:43082/gasdatamanager";
//var mongoCon = "mongodb://localhost/gasdatamanager";

csvData.connectDB(mongoCon).then(function () {
    console.log('connected to mongo');
    csvData.seedCsvraw();
});

app.listen(process.env.PORT, process.env.IP);