var mongoose = require('mongoose');

var api = mongoose.Schema({
    name :  String,
    cbs : String,
    versions : Array,
    desc : String,
    key_features : Array,
    use_cases : Array
},{
    timestamp : true
});

module.exports = mongoose.model('api',api);
