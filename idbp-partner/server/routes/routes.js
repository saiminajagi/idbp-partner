var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');
var exec = require('child_process').exec;

var apimodel = require('../models/apimodel');
var apilistmodel = require('../models/apilistmodel');

var routes = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended: true});
routes.use(bodyParser.json());

var sess;

routes.route('/publishApi')
.post(urlencodedParser,(req,res)=>{
    api = req.body.apis;
    value = req.body.value;
    bank = req.body.bank;

    var newbankapi = new apilistmodel({
        apis : api,
        bank : bank
    });

    newbankapi.save();

})

routes.route('/setbank')
.post(urlencodedParser,(req,res)=>{
    var sess = req.session;
    sess.bank = req.body.bank;
    console.log("bank set as: "+sess.bank);
})

module.exports = routes;
