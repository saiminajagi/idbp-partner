var mongoose = require('mongoose');

var api = mongoose.Schema({
    email : String,
    name : String,
    org : String,
    pass : String,
    amnt : Number,
    freq : Number,
    accno : Number,
    mid : String,
    appid : String,
    cid : String,
    clientID: String,
    clientSecret: String,
    qs : Boolean
},{
    timestamp : true
});

module.exports = mongoose.model('qsmodel',api);
