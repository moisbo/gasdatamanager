var mongoose = require('mongoose');

var csvrawSchema = mongoose.Schema({
    unitId:{type:String},
    chamber:{type: String},
    type:{type:String},
    date:{type:String},
    value:{type:Number}
});

mongoose.model('csvraw', csvrawSchema);