var mongoose = require('mongoose');

var api = mongoose.Schema({
    apis : Array,
    bank : String
},{
    timestamp : true
});

module.exports = mongoose.model('apilist',api);
