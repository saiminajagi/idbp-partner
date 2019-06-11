var request = require('request');

//to by-pass security checking
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var callCoreBackend = function(options,cb){
    try{
        console.log("Options: "+options);
        request(options,(e,resp,body)=>{
            if(resp != undefined){
                cb(null,JSON.parse(resp.body));
            }
        });
    }catch(e){
        cb("error caught while calling core backend",null);
    }
};

exports.callCoreBackend = callCoreBackend;
