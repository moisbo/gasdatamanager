var mongoose = require('mongoose');
var Promise = require('bluebird');
var csvraw = mongoose.model('csvraw');

exports.connectDB = Promise.promisify(mongoose.connect, mongoose);

var createCsv = Promise.promisify(csvraw.create, csvraw);

function findCsvraw(query){
    return Promise.cast(mongoose.model('csvraw').find(query).exec());
};

exports.findCsvraw = findCsvraw;

exports.seedCsvraw = function () {
    return findCsvraw({}).then(function(collection){
        if(collection.length === 0){
            return Promise.map(csvData, function (csv) {
                return createCsv(csv);
            })
        }
    });
};

var csvData = [
    { unitId: "2",    chamber: "5e323d",    type: "co2",    date: "2014-01-01",    value:8432},
    { unitId: "1",    chamber: "5e323d",    type: "ch4",    date: "2014-01-01",    value:8432},
    { unitId: "2",    chamber: "5e323d",    type: "co2",    date: "2014-01-01",    value:8432}
];




