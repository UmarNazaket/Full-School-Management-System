 const winston = require('./winston'),
     chalk = require('chalk');

 // Normalize a port into a number, string, or false.
 const normalizePort = (val) => {
     var port = parseInt(val, 10);

     if (isNaN(port)) {
         // named pipe
         return val;
     }

     if (port >= 0) {
         // port number
         return port;
     }

     return false;
 };

 /**
  * Event listener for HTTP server "error" event.
  */

 const onError = (error) => {
     if (error.syscall !== 'listen') {
         throw error;
     }

     var bind = typeof global.port === 'string' ?
         'Pipe ' + global.port :
         'Port ' + global.port;

     // handle specific listen errors with friendly messages
     switch (error.code) {
         case 'EACCES':
             console.error(bind + ' requires elevated privileges');
             process.exit(1);
             break;
         case 'EADDRINUSE':
             console.error(bind + ' is already in use');
             process.exit(1);
             break;
         default:
             throw error;
     }
 };

 /**
  * Event listener for HTTP server "listening" event.
  */

 const onListening = () => {
     var addr = global.server.address();
     var bind = typeof addr === 'string' ?
         'pipe ' + addr :
         'port ' + addr.port;
     winston.info(chalk.bold.green('Server is listening on', bind));
 };

 module.exports = {
     normalizePort,
     onError,
     onListening
 };