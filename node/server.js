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
    qry = require("querystring"),
    path = require("path"),
    sock = require("socket.io"),
    fs = require("fs");

/*
 * load config
 */

//file
var configFile = path.join(process.cwd(), "config.json");

//sane defaults
var config = {
  db_engine: 'sqlite',
  db_sqlite_file: 'jsdb.sqlite',
  
  html_dir: 'html'
  html_files: {
    'index.html'
  }
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

/*
 * create server
 */
 
var app = http.createServer(httpHandler);
var io  = sock.listen(app);

/*
 *  simple http handler that serves html files containing socket.io client
 */

function httpHandler(req, res) {
  fs.readFile(serveFile('index.html'),
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

/*
 *  socket.io handler. This is where all the magic happens.
 */
 
 
//stubs

var io_chat = io
  .of('/chat')
  .on('connection', function (socket) {
    socket.emit('a message', {
        that: 'only'
      , '/chat': 'will get'
    });
    chat.emit('a message', {
        everyone: 'in'
      , '/chat': 'will get'
    });
  });

var io_news = io
  .of('/news')
  .on('connection', function (socket) {
    socket.emit('item', { news: 'item' });
  });


/*
 * functions
 */
 
function serveFile(file) {
  if (config.html_files.indexOf(file) < 0) {
    file = config.html_files[0];
  }
    
  return path.join(process.cwd(), config.html_dir, file);  
}
