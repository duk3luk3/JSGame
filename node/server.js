/***
 **
 **  JSGame main server
 **
 **
***/

/*
 * imports
 */

var //sys = require("sys"),  
    http = require("http"),  
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    sqlite3 = require('sqlite3').verbose(),
    sock = require('socket.io');

/*
 * load config
 */

//file
var configFile = path.join(process.cwd(), "config.json");

//sane defaults
var config = {
  db_engine: 'sqlite',
  db_sqlite_file: 'jsdb.sqlite',
  
  html_dir: '../asset/html',
  html_files: [
    'index.html'
  ]
};

//look for config file, load if present
path.exists(configFile, function(exists) {
	if (exists) {
		fs.readFile('./helloDir/message.txt','UTF-8' ,function (err, data) {
			if (err) throw err;
			
			config = JSON.parse(data);			
		});
	}
    });

/*
 * create state
 */
 
var state = {
  users: [],
  sessions [],
  
  
  userExists: function(usrname) {
    if (users.indexOf(
  },
};
 
//db magic happens here

/*
 * create server
 */
 
var app = http.createServer(httpHandler);
var io  = sock.listen(app);

app.listen(8088);

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
 *
 *  We need channels to
 *  - Establish a session (register/logging in)
 *    - register: client sends nick and password, receives session id
 *  - Grab non-game data
 *    - ?
 *  - Start a game, submit and receive moves
 *    - get data for lobby
 *    - start a new game
 */
 
 
//session io
var io_session = io
  .of('/session')
  .on('connection', function (socket) {
    
    socket.on('register', function(from, msg) {
    
      if (state.userExists(msg.nickname)) {
        socket.emit('register',{ result: 'fail', reason: 'Nick already registered'} );
      }
      else {
        
        var user = state.userAdd(msg.nickname, msg.password);
        var session = state.sessionCreate(user);
        
        socket.emit('register', { result: 'success', sessid: session.sessid } );
      }
    });
      
    socket.on('login', function(from, msg) {
    
      if (state.userExists(msg.nickname)) {
        
        var user = state.users['msg.nickname'];
        
        if (state.userLogin(msg.password)) {
          var session = state.sessionCreate(user);
          
          socket.emit('login', { result: 'success', sessid: session.sessid } );
        
        }
        else {
          socket.emit('login',{ result: 'fail', reason: 'Authentication failure'} );
        }
      }
      else {
        socket.emit('login',{ result: 'fail', reason: 'Authentication failure'} );   
      }
    });
  });


var io_data = io
  .of('/data')
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

var io_game = io
  .of('/game')
  .on('connection', function (socket) {
    socket.emit('item', { news: 'item' });
  });
  
var io_hello = io
  .of('/hello')
  .on('connection', function (socket) {
    socket.emit('hello', { news: 'item' });
  });


/*
 * functions
 */
 
function queryParams(req) {
  return url.parse(req.url, true).query;
}
 
function serveFile(file) {
  if (config.html_files.indexOf(file) < 0) {
    file = config.html_files[0];
  }
    
  return path.join(process.cwd(), config.html_dir, file);  
}
