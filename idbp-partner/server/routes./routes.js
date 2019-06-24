var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');
var multer = require('multer');
var path = require('path');
var handlebars = require('handlebars');
var fs = require('fs');

// to read html file
var readHTMLFile = function(path, callback) {
  fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
      if (err) {
          throw err;
          callback(err);
      }
      else {
          callback(null, html);
      }
  });
};

var qsmodel = require('../models/qsmodel');
var apilistmodel = require('../models/apilistmodel');
var backendCall = require('../utility');

var routes = express.Router();

var urlencodedParser = bodyParser.urlencoded({limit:'50mb',extended: true});
routes.use(bodyParser.json({limit:'50mb',extended:true}));

var sess;

routes.route('/publishApi')
.post(urlencodedParser,(req,res)=>{
    console.log("publish api called");
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

    res.json("bank has been set");
})

routes.route('/quickSignupConfirm')
.post((req,res)=>{
    var hashpwd = passwordHash.generate(req.body.pass);

    var sess = req.session;
    var bank = sess.bank;
    sess.email = req.body.email;
    console.log(sess.email+" is set as the session email");

    var newqs = new qsmodel({
        email: req.body.email,
        name: req.body.name,
        org : req.body.org,
        pass : hashpwd,
        amnt : 0,
        freq : 0,
        accno : 0,
        mid : "default",
        appid : "default",
        cid : "default",
        clientID: "default",
        clientSecret: "default",
        qs : false,
        ruleset: false
    });
    newqs.save();

    // ============================ GENERATING A TOKEN ========================
    TokenObj = {
        "username": "amit",
        "password": "Good@luck#1",
        "realm": "provider/default-idp-2",
        "client_id": "idbpappid",
        "client_secret": "idbpappsecret",
        "grant_type": "password"
      };
    var tokenobjstring = JSON.stringify(TokenObj);
    var baseUrl = "https://platform.9.202.177.31.xip.io/api";
    var tokenUrl = baseUrl+"/token";

    var org = "think";
    var catalog = "sandbox";
    var user_registry = "sandbox-catalog";

    var options = {
        "method": "POST",
        "url" : tokenUrl,
        "headers" : {
            'Content-Type':'application/json',
            'Accept' : 'application/json'
        },
        "body" : tokenobjstring
    };

    backendCall.callCoreBackend(options,(err,res)=>{
        if(!err){

            console.log("token response receieved:" + res.access_token);
            // ================================== CREATING A NEW USER =============================
            //create a user account.
            var date = new Date();
            date = date+"T06:40:40.685Z".toString();

            var access_token = "Bearer "+res.access_token;
            var userObj = {
                "type": "user",
                "api_version": "2.0.0",
                "name": req.body.name,
                "title": req.body.name,
                "summary": "owner of consumer org"+ req.body.name,
                "state": "enabled",
                "identity_provider": "sandbox-idp",
                "username": req.body.name,
                "password": req.body.pass,
                "force_password_change": false,
                "email": req.body.email,
                "first_name": req.body.name,
                "last_name": req.body.name,
                "last_login_at": "2019-06-11T06:40:40.685Z",
                "created_at": "2019-06-11T06:40:40.685Z",
                "updated_at": "2019-06-11T06:40:40.685Z"
            }
            var userObjString = JSON.stringify(userObj);

            var userURL = baseUrl+"/user-registries/"+org+"/"+user_registry+"/users";
            var options = {
                "method": "POST",
                "url" : userURL,
                "headers" : {
                    'Content-Type':'application/json',
                    'Accept' : 'application/json',
                    'Authorization' : access_token
                },
                "body" : userObjString
            };

            backendCall.callCoreBackend(options,(err,res)=>{
                if(!err){
                    console.log("user object response received: "+res.url);
                    // ================================== CREATING AN ORGANISATION =============================
                    var owner_url = res.url;
                    var org_url = baseUrl+"/catalogs/"+org+"/"+catalog+"/consumer-orgs";
                    var orgobj = {
                        "type": "consumer_org",
                        "api_version": "2.0.0",
                        "name": req.body.org,
                        "title": req.body.org,
                        "summary": req.body.org+" created from provider rest api using postman",
                        "state": "enabled",
                        "owner_url": owner_url,

                        "created_at": "2019-06-11T06:40:40.685Z",
                        "updated_at": "2019-06-11T06:40:40.685Z"
                    }
                    var orgobjString = JSON.stringify(orgobj);

                    var options = {
                        "method": "POST",
                        "url" : org_url,
                        "headers" : {
                            'Content-Type':'application/json',
                            'Accept' : 'application/json',
                            'Authorization' : access_token
                        },
                        "body" : orgobjString
                    };

                    backendCall.callCoreBackend(options,(err,res)=>{
                        if(!err){
                            console.log("org object response: "+JSON.stringify(res));
                            // ================================== CREATING AN APP =============================
                            var appObj = {
                                "type": "app",
                                "api_version": "2.0.0",
                                "name": "app-"+req.body.org,
                                "title": "app-"+req.body.org,
                                "summary": "app for the consumer org "+req.body.org,
                                "state": "enabled",
                                "lifecycle_state": "production",
                                "lifecycle_state_pending": "production",
                                "redirect_endpoints": [
                                  "http://sivan.ge/pof"
                                ],
                                "created_at": "2019-06-11T06:40:40.685Z",
                                "updated_at": "2019-06-11T06:40:40.685Z"
                              }
                              var appObjString = JSON.stringify(appObj);

                              var app_url = baseUrl+"/consumer-orgs/"+org+"/"+catalog+"/"+req.body.org+"/apps";

                              var options = {
                                "method": "POST",
                                "url" : app_url,
                                "headers" : {
                                    'Content-Type':'application/json',
                                    'Accept' : 'application/json',
                                    'Authorization' : access_token
                                },
                                "body" : appObjString
                            };

                                backendCall.callCoreBackend(options,(err,res)=>{
                                    console.log("app creation response :");
                                    sess.clientID = res.client_id;
                                    sess.clientSecret = res.client_secret;

                                    console.log("client ID: "+res.client_id);
                                    console.log("client secret: "+res.client_secret);
                                    // ================================== LIST OF ALL APIS =============================
                                    var list_url = baseUrl+"/catalogs/"+org+"/"+catalog+"/products?";
                                    var options = {
                                        "method": "GET",
                                        "url" : list_url,
                                        "headers" : {
                                            'Accept' : 'application/json',
                                            'Authorization' : access_token
                                        },
                                    };
                                    backendCall.callCoreBackend(options,(err,res)=>{
                                        console.log("list of all api response "+res.total_results);
                                        //get the total api and loop through each of them.
                                        for(i=0;i<res.total_results;++i)
                                        {
                                            //get the product url
                                            if(res.results[i].state == "published"){
                                                var prod_url = res.results[i].url;
                                                console.log("product url of product "+i+": "+prod_url);
                                                var subobj = {
                                                    "type": "subscription",
                                                    "api_version": "2.0.0",
                                                    "product_url": prod_url,
                                                    "plan": "default-plan",
                                                    "state_pending": "enabled",
                                                    "created_at": "2019-06-11T06:40:40.685Z",
                                                    "updated_at": "2019-06-11T06:40:40.685Z"
                                                }
                                                var subobjstring = JSON.stringify(subobj);
                                                var sub_url = baseUrl+"/apps/"+org+"/"+catalog+"/"+req.body.org+"/app-"+req.body.org+"/subscriptions";
                                                // console.log("......"+sub_url);
                                                var options = {
                                                    "method": "POST",
                                                    "url" : sub_url,
                                                    "headers" : {
                                                        'Content-Type':'application/json',
                                                        'Accept' : 'application/json',
                                                        'Authorization' : access_token
                                                    },
                                                    "body" : subobjstring
                                                };
                                                var title = res.results[i].title;
                                                backendCall.callCoreBackend(options,(err,res)=>{
                                                    console.log("*********************************************************************************");
                                                    console.log("subscribing for product: "+title);
                                                    console.log("subscription for app done: "+JSON.stringify(res));
                                                    if(!err){

                                                    }else{
                                                        console.log(err);
                                                    }
                                                })
                                            }
                                        }
                                        //set that quick signup is completed.
                                        qsmodel.findOneAndUpdate({email: sess.email},{qs: true, clientID:sess.clientID, clientSecret: sess.clientSecret},
                                          {new :true},(err,doc)=>{});
                                        console.log("client id and secret before sending mail: "+sess.clientID+" "+sess.clientSecret);
                                        //all apps have been subscribed.
                                        sendmail(req.body.email,bank,req.body.name,sess.clientID,sess.clientSecret);
                                        //res.json("quick signup completed");
                                    })
                                })
                        }else{
                            console.log("error at creating an organisation "+err);
                        }
                    })
                }else{
                    console.log("error at creating a user "+err);
                }
            });
        }else{
            console.log("error at generating a token "+err);
        }
    })
     res.json("signup successful l");
})

routes.route('/getapilist')
.get((req,res)=>{
  TokenObj = {
    "username": "amit",
    "password": "Good@luck#1",
    "realm": "provider/default-idp-2",
    "client_id": "idbpappid",
    "client_secret": "idbpappsecret",
    "grant_type": "password"
  };
  var tokenobjstring = JSON.stringify(TokenObj);
  var baseUrl = "https://platform.9.202.177.31.xip.io/api";
  var tokenUrl = baseUrl+"/token";

  var org = "think";
  var catalog = "sandbox";

  var options = {
      "method": "POST",
      "url" : tokenUrl,
      "headers" : {
          'Content-Type':'application/json',
          'Accept' : 'application/json'
      },
      "body" : tokenobjstring
  };

  backendCall.callCoreBackend(options,(err,token_response)=>{
    if(!err){
      var access_token = "Bearer "+token_response.access_token;
      var list_url = baseUrl+"/catalogs/"+org+"/"+catalog+"/products?";
      var options = {
          "method": "GET",
          "url" : list_url,
          "headers" : {
              'Accept' : 'application/json',
              'Authorization' : access_token
          },
      };
      backendCall.callCoreBackend(options,(err,response)=>{
        res.json(response);
      });

    }else{
      console.log("error at generating token");
    }
  });
})

routes.route('/getInt')
.get((req,res)=>{
  var sess = req.session;
  console.log(sess.email+' this is the session email');

  qsmodel.find({email:sess.email},(err,doc)=>{
    var myObj = {
        org : doc[0].org,
        email: doc[0].email
    }
    res.json(myObj);
  })
})

routes.route('/loginconfirm')
.post(urlencodedParser,(req,res)=>{
    var sess = req.session;
    qsmodel.find({email: req.body.email},(err,doc)=>{
        if(doc.length == 0){
            var msg = "Invalid email";
            var obj = {
                status: 0,
                msg : "entered invalid email"
            }
            res.json(obj);
        }
        else{
            //check for password.
            if(passwordHash.verify(req.body.pass,doc[0].pass)){
                //login successful
                sess.email = req.body.email;
                console.log("email set as :"+sess.email);
                var obj = {
                    status: 1,
                    msg : "Login Successful"
                }
                res.json(obj);
            }else{
                console.log("entered wrong pass");
                var obj = {
                    status: 0,
                    msg : "Wrong Password.Please try again"
                }
                res.json(obj);
            }
        }
    })
});

routes.route('/checklogin')
.get((req,res)=>{
    var sess = req.session;

    //change the adminmodel to qsmodel.
    if(sess.email){
      qsmodel.find({email: sess.email},(err,doc)=>{
        res.json(doc[0].name)
      });
    }else {res.json(0); }
})

routes.route('/logout')
.get((req,res)=>{
    var sess = req.session;
    sess.admin  = 0; // I dont know this logic
    sess.email = "null";

    res.json(sess.bank);
})

routes.route('/partnerfile')
.post(urlencodedParser,(req,res)=>{
    console.log("recieved the files: "+JSON.stringify(req.body));
    res.json("reply from server");
});

function sendmail(email,bank,username,clientID,clientSecret){
    console.log(clientID+" "+clientSecret+" in mail function");
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user : 'ibm.idbp@gmail.com',
            pass : 'Modified@2017'
        }
        });

        readHTMLFile(path.join(__dirname, '../views/test-api-credentials-after-quick-signup.html'), function(err, html) {
          var template = handlebars.compile(html);
          var replacements = {
               username: `${username}`,
               bank:`${bank}`,
               clientID:`${clientID}`,
               clientSecret:`${clientSecret}`
          }
          var htmlToSend = template(replacements);
          var mailOptions = {
            from: 'ibm.idbp@gmail.com',
            to: `${email}`,
            subject: 'Test API credentials',
            text: 'That was easy!',
            html : htmlToSend
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
          });
        });
}

routes.route('/profile')
.get((req,res)=>{
    var sess = req.session;
    console.log("user default "+sess.email);
    //check what kind of user he is..

    qsmodel.find({email: sess.email},(err,doc)=>{
      var myObj = {
        email: doc[0].email,
        name: doc[0].name,
        org: doc[0].org,
        clientID: doc[0].clientID,
        clientSecret: doc[0].clientSecret
      }
      res.json(myObj);
    })
});

routes.route('/paymentrulesdetails')
.post(urlencodedParser,(req,res)=>{
    console.log("payment rules received to partner");

    qsmodel.findOneAndUpdate({email:req.body.email},{ruleset: true, amnt:req.body.amnt, freq:req.body.freq, accno:req.body.accno, mid:req.body.mid, appid:req.body.appid, cid:req.body.cid },{new:true},(err,doc)=>{
      console.log(err);
    });

})

.get((req,res)=>{
  var sess = req.session;
  qsmodel.find({email: sess.email},(err,doc)=>{
    var myObj = {
      amnt: doc[0].amnt,
      freq: doc[0].freq,
      accno: doc[0].accno,
      appid: doc[0].appid,
      mid: doc[0].mid,
      cid: doc[0].cid
    }
    res.json(myObj);
  })
});

routes.route('/setDocs/:email/:org/:bank')
.get((req,res)=>{
  var sess = req.session;
  sess.pemail = req.params.email;
  sess.porg = req.params.org;
  sess.pbank = req.params.bank;

  res.sendFile(path.join(__dirname,'fileupload.html'));
})

routes.route('/checkPermitted')
.get((req,res)=>{
  var sess = req.session;

  qsmodel.find({email:sess.email},(err,doc)=>{
    if(doc[0]){
      if(doc[0].ruleset)
        res.json(1);
      else
        res.json(0);
    }
  })
})


var upload = multer({dest : __dirname+'./uploads'});
routes.route('/handlefiles')
.post(upload.single('myFile'),(req,res)=>{
    res.json("check the folder!");
})

module.exports = routes;

//file upload example
// https://www.tutsmake.com/new-angular-7-upload-file-image-example/
