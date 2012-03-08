/***
 **
 **  JSGame main server
 **
 **
***/

/*
 * imports
 */

var sys = require("sys"),  
    http = require("http"),  
    url = require("url"),  
    path = require("path"),  
    fs = require("fs");

/*
 * load config
 */

//file
var configFile = path.join(process.cwd(), "config.json");

//sane defaults
var config = {
  database: 'jsdb.sqlite'
}

//look for config file, load if present
path.exists(configFile, function(exists) {
	if (exists) {
		fs.readFile('./helloDir/message.txt','UTF-8' ,function (err, data) {
			if (err) throw err;
			
			config = JSON.parse(data);			
		});
	}
    });  
});
