'use strict'

const http = require('../src/app');
const debug = require('debug')('apinodejs:server');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log('API rodando na porta ' + port);

/**
* Normaliza a porta da aplicação, função originada do gerador de código do express
*/
function normalizePort(val) {
    const port = parseInt(val, 10);
    
    if (isNaN(port)) {
        return val;
    }
    
    if (port >= 0) {
        return port;
    }
    
    return false;
}

/**
* Trata erros do servidor, função originada do gerador de código do express
*/
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    
    const bind = typeof port === 'string' 
    ? 'pipe ' + port 
    : 'port ' + port;
    
    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'requires elevated privileges');
            process.exit(1);
            break;
        
        case 'EADDRINUSE':
            console.error(bind + 'is already in use');
            process.exit(1);
            break;    
        
        default:
            throw error;
    }   
}

/**
 * Starta o degub
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    debug('Listening on ' + bind);
}