var pkgcloud = require('pkgcloud-bluemix-objectstorage');

var fs = require('fs');

// Create a config object
var config = {};
// Specify Openstack as the provider
config.provider = "openstack";
// Authentication url
config.authUrl = 'https://identity.open.softlayer.com/';
config.region= 'dallas';
// Use the service catalog
config.useServiceCatalog = true;
// true for applications running inside Bluemix, otherwise false
config.useInternal = false;
// projectId as provided in your Service Credentials
config.tenantId = 'b8ed724357314abfb25c90e2e8b88a02';
// userId as provided in your Service Credentials
config.userId = '2c0a295c812744baad27feda6006e084';
// username as provided in your Service Credentials
config.username = 'Admin_1a7b0d053331e8ff3647815374dbd26f6b2fc416';
// password as provided in your Service Credentials
config.password = 'nz7M&d,shM5Hl{VM';

//This is part which is NOT in original pkgcloud. This is how it works with newest version of bluemix and pkgcloud at 22.12.2015. 
//In reality, anything you put in this config.auth will be send in body to server, so if you need change anything to make it work, you can. PS : Yes, these are the same credentials as you put to config before. 
//I do not fill this automatically to make it transparent.
config.auth = {
    forceUri  : "https://identity.open.softlayer.com/v3/auth/tokens", //force uri to v3, usually you take the baseurl for authentication and add this to it /v3/auth/tokens (at least in bluemix)    
    interfaceName : "public", //use public for apps outside bluemix and internal for apps inside bluemix. There is also admin interface, I personally do not know, what it is for.
    "identity": {
        "methods": [
            "password"
        ],
        "password": {
            "user": {
                "id": "2c0a295c812744baad27feda6006e084", //userId
                "password": "nz7M&d,shM5Hl{VM" //userPassword
            }
        }
    },
    "scope": {
        "project": {
            "id": "b8ed724357314abfb25c90e2e8b88a02" //projectId
        }
    }
};

//console.log("config: " + JSON.stringify(config));

// Create a pkgcloud storage client
var storageClient = pkgcloud.storage.createClient(config);


// Authenticate to OpenStack
storageClient.auth(function (error) {
    if (error) {
        console.error("storageClient.auth() : error creating storage client: ", error);
    } else {
        storageClient.getFiles('playon sports', function (err, files) { 
            if(err) throw err;
            else{
                for(var i = 0; i < files.length; i++) {
                    var writeStream = storageClient.upload({
                        container: 'playonSports out',
                        remote: files[i].name
                    });

                    writeStream.on('error', function(err) {
                       // handle your error case
                        console.log("concluido o upload com err!");
                      console.log(err);
                    });

                    writeStream.on('success', function(file) {
                      // success, file will be a File model
                     console.log("concluido o upload com sucesso!");
                    });

                    storageClient.download({
                        container: 'playon sports',
                        remote: files[i].name
                    }).pipe(writeStream);
                        //readStream.pipe(writeStream); 
                }
            }
        });                               
    }
});
