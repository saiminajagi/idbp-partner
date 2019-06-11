var mongoose = require('mongoose');

var api = mongoose.Schema({
    email : String,
    name : String,
    org : String,
    pass : String
},{
    timestamp : true
});

module.exports = mongoose.model('qsmodel',api);
