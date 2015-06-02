var expect = require('chai').expect;
var mongoose = require('mongoose');
var csvrawModel = require('../models/csvraw');
var Promise = require('bluebird');
var csvData = require('../csv-data');

function resetCsvraw(){
    return new Promise(function(resolve, reject){
        mongoose.connection.collections['csvraws'].drop(resolve, reject);
    });
}

describe("get csvraw", function () {
    var csvrawList;

    before(function (done) {
        csvData.connectDB('mongodb://localhost/gasdatamanager')
            .then(resetCsvraw)
            .then(csvData.seedCsvraw)
            .then(csvData.findCsvraw)
            .then(function(collection) {
                csvrawList = collection;
                done();
            })
    })
    it("should never be empty since data is seeded", function () {
        expect(csvrawList.length).to.be.at.least(1);
    });
    it("should have a chamber id", function () {
        expect(csvrawList[0].chamber).to.not.be.empty;
    });
    it("should have a type", function () {
        expect(csvrawList[0].type).to.not.be.empty;
    })
});

