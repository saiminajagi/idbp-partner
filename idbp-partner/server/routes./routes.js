var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');
var exec = require('child_process').exec;
var multer = require('multer');

var apimodel = require('../models/apimodel');
var qsmodel = require('../models/qsmodel');
var apilistmodel = require('../models/apilistmodel');
var backendCall = require('../utility');

var routes = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended: true});
routes.use(bodyParser.json());

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
        qs : false
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

    // backendCall.callCoreBackend(options,(err,res)=>{
    //     if(!err){

    //         console.log("token response receieved:" + res.access_token);
    //         // ================================== CREATING A NEW USER =============================
    //         //create a user account.
    //         var date = new Date();
    //         date = date+"T06:40:40.685Z".toString();

    //         var access_token = "Bearer "+res.access_token;
    //         var userObj = {
    //             "type": "user",
    //             "api_version": "2.0.0",
    //             "name": req.body.name,
    //             "title": req.body.name,
    //             "summary": "owner of consumer org"+ req.body.name,
    //             "state": "enabled",
    //             "identity_provider": "sandbox-idp",
    //             "username": req.body.name,
    //             "password": req.body.pass,
    //             "force_password_change": false,
    //             "email": req.body.email,
    //             "first_name": req.body.name,
    //             "last_name": req.body.name,
    //             "last_login_at": "2019-06-11T06:40:40.685Z",
    //             "created_at": "2019-06-11T06:40:40.685Z",
    //             "updated_at": "2019-06-11T06:40:40.685Z"
    //         }
    //         var userObjString = JSON.stringify(userObj);

    //         var userURL = baseUrl+"/user-registries/"+org+"/"+user_registry+"/users";
    //         var options = {
    //             "method": "POST",
    //             "url" : userURL,
    //             "headers" : {
    //                 'Content-Type':'application/json',
    //                 'Accept' : 'application/json',
    //                 'Authorization' : access_token
    //             },
    //             "body" : userObjString
    //         };

    //         backendCall.callCoreBackend(options,(err,res)=>{
    //             if(!err){
    //                 console.log("user object response received: "+res.url);
    //                 // ================================== CREATING AN ORGANISATION =============================
    //                 var owner_url = res.url;
    //                 var org_url = baseUrl+"/catalogs/"+org+"/"+catalog+"/consumer-orgs";
    //                 var orgobj = {
    //                     "type": "consumer_org",
    //                     "api_version": "2.0.0",
    //                     "name": req.body.org,
    //                     "title": req.body.org,
    //                     "summary": req.body.org+" created from provider rest api using postman",
    //                     "state": "enabled",
    //                     "owner_url": owner_url,

    //                     "created_at": "2019-06-11T06:40:40.685Z",
    //                     "updated_at": "2019-06-11T06:40:40.685Z"
    //                 }
    //                 var orgobjString = JSON.stringify(orgobj);

    //                 var options = {
    //                     "method": "POST",
    //                     "url" : org_url,
    //                     "headers" : {
    //                         'Content-Type':'application/json',
    //                         'Accept' : 'application/json',
    //                         'Authorization' : access_token
    //                     },
    //                     "body" : orgobjString
    //                 };

    //                 backendCall.callCoreBackend(options,(err,res)=>{
    //                     if(!err){
    //                         console.log("org object response: "+JSON.stringify(res));
    //                         // ================================== CREATING AN APP =============================
    //                         var appObj = {
    //                             "type": "app",
    //                             "api_version": "2.0.0",
    //                             "name": "app-"+req.body.org,
    //                             "title": "app-"+req.body.org,
    //                             "summary": "app for the consumer org "+req.body.org,
    //                             "state": "enabled",
    //                             "lifecycle_state": "production",
    //                             "lifecycle_state_pending": "production",
    //                             "redirect_endpoints": [
    //                               "http://sivan.ge/pof"
    //                             ],
    //                             "created_at": "2019-06-11T06:40:40.685Z",
    //                             "updated_at": "2019-06-11T06:40:40.685Z"
    //                           }
    //                           var appObjString = JSON.stringify(appObj);

    //                           var app_url = baseUrl+"/consumer-orgs/"+org+"/"+catalog+"/"+req.body.org+"/apps";

    //                           var options = {
    //                             "method": "POST",
    //                             "url" : app_url,
    //                             "headers" : {
    //                                 'Content-Type':'application/json',
    //                                 'Accept' : 'application/json',
    //                                 'Authorization' : access_token
    //                             },
    //                             "body" : appObjString
    //                         };

    //                             backendCall.callCoreBackend(options,(err,res)=>{
    //                                 console.log("app creation response :");
    //                                 sess.clientID = res.client_id;
    //                                 sess.clientSecret = res.client_secret;

    //                                 console.log("client ID: "+res.client_id);
    //                                 console.log("client secret: "+res.client_secret);
    //                                 // ================================== LIST OF ALL APIS =============================
    //                                 var list_url = baseUrl+"/catalogs/"+org+"/"+catalog+"/products?";
    //                                 var options = {
    //                                     "method": "GET",
    //                                     "url" : list_url,
    //                                     "headers" : {
    //                                         'Accept' : 'application/json',
    //                                         'Authorization' : access_token
    //                                     },
    //                                 };
    //                                 backendCall.callCoreBackend(options,(err,res)=>{
    //                                     console.log("list of all api response "+res.total_results);
    //                                     //get the total api and loop through each of them.
    //                                     for(i=0;i<res.total_results;++i)
    //                                     {
    //                                         //get the product url
    //                                         if(res.results[i].state == "published"){

    //                                             var prod_url = res.results[i].url;
    //                                             console.log("product url of product "+i+": "+prod_url);
    //                                             var subobj = {
    //                                                 "type": "subscription",
    //                                                 "api_version": "2.0.0",
    //                                                 "product_url": prod_url,
    //                                                 "plan": "default-plan",
    //                                                 "state_pending": "enabled",
    //                                                 "created_at": "2019-06-11T06:40:40.685Z",
    //                                                 "updated_at": "2019-06-11T06:40:40.685Z"
    //                                             }
    //                                             var subobjstring = JSON.stringify(subobj);
    //                                             var sub_url = baseUrl+"/apps/"+org+"/"+catalog+"/"+req.body.org+"/app-"+req.body.org+"/subscriptions";
    //                                             // console.log("......"+sub_url);
    //                                             var options = {
    //                                                 "method": "POST",
    //                                                 "url" : sub_url,
    //                                                 "headers" : {
    //                                                     'Content-Type':'application/json',
    //                                                     'Accept' : 'application/json',
    //                                                     'Authorization' : access_token
    //                                                 },
    //                                                 "body" : subobjstring
    //                                             };
    //                                             var title = res.results[i].title;
    //                                             backendCall.callCoreBackend(options,(err,res)=>{
    //                                                 console.log("*********************************************************************************");
    //                                             console.log("subscribing for product: "+title);
    //                                                 console.log("subscription for app done: "+JSON.stringify(res));
    //                                                 if(!err){

    //                                                 }else{
    //                                                     console.log();
    //                                                 }
    //                                             })
    //                                         }
    //                                     }
    //                                     //set that quick signup is completed.
    //                                     qsmodel.findOneAndUpdate({email: sess.email},{qs: true},{new :true},(err,doc)=>{});
    //                                     console.log("client id and secret before sending mail: "+sess.clientID+" "+sess.clientSecret);
    //                                     //all apps have been subscribed.
    //                                     sendmail(req.body.email,bank,req.body.name,sess.clientID,sess.clientSecret);
    //                                     res.json("quick signup completed");
    //                                 })
    //                             })
    //                     }else{
    //                         console.log("error at creating an organisation "+err);
    //                     }
    //                 })
    //             }else{
    //                 console.log("error at creating a user "+err);
    //             }
    //         });
    //     }else{
    //         console.log("error at generating a token "+err);
    //     }
    // })
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
                sess.role = doc[0].role;
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

function sendmail(email,bank,username,clientID,clientSecret){
    console.log(clientID+" "+clientSecret+" in mail function");
    var link = `http://localhost:3000/route/confirm/${email}`;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // user: process.env.GMAIL_USER,
            // pass: process.env.GMAIL_PASS
            user : 'tushartdm117@gmail.com',
            pass : 'fcb@rc@M$N321'
        }
        });

        var mailOptions = {
            from: 'tushartdm117@gmail.com',
            to: `${email}`,
            subject: 'IDBP Bank portal credentials',
            text: 'That was easy!',
            html : `
            <html>
            <head>
                <style>
                    .maindiv{
                        box-shadow: 5px 5px 10px grey;
                        margin-left: 35%;
                        border: solid 2px grey;
                        width: 550px;
                        margin-top: 20px;
                        padding-left: 35px;
                        padding-bottom: 20px;
                        border-radius: 20px;
                        padding-top: 10px;
                    }
                    h2{
                        margin-left: 44%;
                        color:rgb(91, 91, 204);
                    }

                    a{
                        text-decoration: none;
                        color:rgb(83, 134, 6)
                    }
                </style>
            </head>
            <body>
                <div class="maindiv">
                    <h2> IDBP Partner Portal</h2>
                    <p> Welcome!! you are now successfully registered to ${bank} bank Api Portal (http://localhost:9000/home/${bank}).
                        You have complete access to all our API's in sandbox environment  </p>
                    <h4> Here are the next steps: </h4>
                        <p> - Login to our API Portal (https://portal.9.202.177.31.xip.io/think/sandbox/) with your credentials furnished during registration </p>
                        <p> - username : ${username} </p>
                        <p> - explore our APIs and use below credentials to test our APIs </p>
                        <p> - here are APIkeys for testing our APIs in our sandbox environment </p>
                        <p> Client ID : ${clientID} </p>
                        <p> Client Secret : ${clientSecret} </p>
                        <p> once you create your awesome web or mobile application and test in our sandbox environment you can register interest to use our PROD
                            environment(more info in Getting started link in our site https://localhost:9000/gettingstarted ) </p>
                </div>
            </body>
        </html> `
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
}

var upload = multer({dest : __dirname+'./uploads'});
routes.route('/handlefiles')
.post(upload.single('myFile'),(req,res)=>{
    res.json("check the folder!");
})

module.exports = routes;


//file upload example
// https://www.tutsmake.com/new-angular-7-upload-file-image-example/
