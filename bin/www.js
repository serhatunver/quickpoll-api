#!/usr/bin/env node

import { config } from '../config/index.js';
import connectMongo from '../db/db.js';

/**
 * Module dependencies.
 */

import app from '../app.js';
import Debug from 'debug';
const debug = Debug('backend:server');
import http from 'http';
import { createSocketServer } from '../socket.js';

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(config.port || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const httpServer = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

connectMongo().then(() => {
  httpServer.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
  httpServer.on('error', onError);
  httpServer.on('listening', onListening);
  createSocketServer(httpServer);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

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
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = httpServer.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
