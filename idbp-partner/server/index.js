var express = require('express');
var path = require('path');
var session = require('express-session');

var routes = require('./routes/routes');
var files =require('./routes/file');

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/idbppartner',{useNewUrlParser: true},(err,db)=>{

    if(err) console.log(err);
    else console.log("connection to db success");
});


var app = express();
app.use(express.static(path.join(__dirname,'..','dist','idbp-partner')));
app.use(session({secret : 'bankConnectSecret',saveUninitialized: true,resave: true}));

//allowing cross origin requests.
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); //(instead of *) == http://localhost:3000 if only this should have access.
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type,Accept,Authorization"
    );
    if(req.mehtod === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
app.use('/route',routes);
app.use('/files',files);

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../dist/idbp-partner/index.html'));
});

app.listen(9000);
console.log("listening to port 9000");
