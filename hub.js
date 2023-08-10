// 'use strict';

// const events = require('./eventPool.js');
// // const Chance = require('chance')

// require('./driver/driver.index');
// require('./vendor/vendor.index');
const { Server } = require('socket.io');
const events = require('./utility.js');


const io = new Server();

io.listen(3000);

//namespace
const caps = io.of('/caps')

function handlePickupReady(payload, socket) {
  console.log('the pickup was requested', payload.orderId);
  // socket only emits back to one socket
  socket.emit('recieved', { message: 'pickup acknowledged',...payload });
  // emit to everyone that is prepared to listen
  caps.emit(events.ready, { message: 'a pickup is now ready', ...payload })
}

// // emit to everyone who is prepared to listen
// socket.emit('recieved', { message: 'pickup acknowledge' })
// io.emit('announcement', { message: " a order is ready to be picked up" })

function handlePickedUp(payload) {
  console.log('the driver picked up the package', payload.orderId);
  caps.emit(events.pickedUp, payload);
}

function handleInTransit(payload) {
  console.log('the package is in transit', payload.orderId);
  caps.emit(events.inTransit, payload);
}

function handleConnection(socket) {
  console.log('we have a new connection: ', socket.id);
  socket.on(events.pickup, (payload) => handlePickupReady(payload, socket))
  socket.on(events.pickedUp, handlePickedUp)
  socket.on(events.inTransit, handleInTransit)
  socket.on(events.delivered, handleDelivered)
}
// on = listen
// emit = send

function handleDelivered(payload) {
  console.log(`the packge for ${payload.customer} has been delivered`);
  caps.emit(events.delivered, {
    orderId: payload.orderId,
    message: `the packge for ${payload.customer} has been delivered`
  });
}

function startSocketServer() {
  console.log('the server has been started');
  caps.on('connection', handleConnection);
  // connection ^ is a magic word that listens and reacts to any client connections that are made
  // a socket will be passed on connection

}

module.exports = { 
  startSocketServer,
handleInTransit,
handleDelivered,
io,
caps };