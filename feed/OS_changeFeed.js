var request = require('request');

function main() {
     //var location = 'Vermont';
     var Surl = 'https://dal.objectstorage.open.softlayer.com/v1/AUTH_b8ed724357314abfb25c90e2e8b88a02';
     var auth = 'gAAAAABXC-V_jvDJGAV24AGKeHlcRKHT9VawA-57O3hi88f9iC2kDJpCjnNKb4oMMmAHgYHO16wVfcdtRI6-2wjMopgxw4hx86JvBdID9DiVV20jDxTsGM3yYEC_IBwC1Uq4-ZMomK4p0GADV3pByt_vKWE0lqfmOYKathj0uZhZKQYotz9r_ZA';
     var container = 'swift_test';
     var object = 'helloOS';
     var endpoint = Surl+'/'+container+'/'+object;
     request.put({url:endpoint, headers:{"X-Auth-Token": auth}}, function(error, response, body) {
            
        console.log('cloudant trigger feed: done http request', '[error:]', error);
        if (!error && response.statusCode == 201) {
            //console.log("object uploaded successfully");
            console.log(body);
            whisk.done(response);
        } else {
                if (response) {
                    console.log('response code:', response.statusCode);
                } else {
                    console.log('no response');
                }
               whisk.error(error);
        }
     });

     return whisk.async();
 }
