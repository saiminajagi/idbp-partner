var express = require('express'); 
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');

// models--------------------

var partner = require('../models/partnermodel');

var storage = multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,path.join(__dirname,'uploads'))
	},
	filename: function(req,file,cb){
		cb(null,Date.now() + file.originalname);
	}
});
var upload = multer({ storage:storage });

var MongoClient = require('mongodb').MongoClient;

var files = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended: true});
files.use(bodyParser.json());
files.use(bodyParser.urlencoded({extended:true}));

var sess;

files.route('/upload/:email/:org/:bank')
.post(upload.any(),(req,res)=>{
    var sess = req.session;
    partner.findOneAndUpdate({email:sess.email},{files:true},{new:true},(err,doc)=>{});
    
    //convert the files to b64 format and store it in db
    var dirpath = path.join(__dirname,'uploads');
    fs.readdir(dirpath, function(err, items){
        for (var i=0; i<items.length; i++) {
            recentfile = path.join(__dirname,'uploads',items[i]);
            var b64 = new Buffer(fs.readFileSync(recentfile)).toString("base64");

            var fname;
            if(i==0)
                fname = "aadhaar";
            else if(i==1)
                fname = "PAN";

            MongoClient.connect('mongodb://localhost:27017/idbp',{ useNewUrlParser: true },(err,client)=>{
            if(err){ 
                console.log("Please check you db connection parameters");
              }else{
                var db = client.db('idbp');
                var collection = db.collection('files');
                collection.insertOne({email:req.params.email,org:req.params.org,filename:fname,file:b64},(err,res)=>{
                    if(err) console.log("error while inserting file in db: "+err);
                })
              }
            })

            //this delets the file
            fs.unlinkSync(recentfile);
        }
    });
    var bank = req.params.bank;
    res.redirect(`/home/${bank}`);

})

module.exports = files;