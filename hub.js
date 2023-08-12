// 'use strict';

// const events = require('./eventPool.js');
// // const Chance = require('chance')

// require('./driver/driver.index');
// require('./vendor/vendor.index');
const { Server } = require('socket.io');
const { EVENT_NAMES, Queue } = require('./utility.js');


const io = new Server();

io.listen(3000);

//namespace
const caps = io.of('/caps')

const driverQueue = new Queue();
const vendorQueue = new Queue();

function handleDriverReady(socket){ 
  // driver flagging they are ready
  console.log('driver #', socket.id, 'is in queue and ready');
  if (vendorQueue.isEmpty()) {
    // if no package ready to be delivered
    driverQueue.enqueue(socket);
  } else {
    // if package is ready, driver at front of queue deliveres it
    // dequeu vendor, emit 1 driver.Id (socket) to pick up
    const parcel = vendorQueue.dequeue();
    socket.emit(EVENT_NAMES.pickup, parcel)
  }
}


function handlePickupReady(payload, socket) {
  console.log(payload, 'the paylaod is here ++++++++++');
  console.log('the pickup was requested', payload.orderId);
  // socket only emits back to one socket
  socket.emit('recieved', { message: 'pickup acknowledged', ...payload });
  // emit to everyone that is prepared to listen
  caps.emit(EVENT_NAMES.ready, { message: 'a pickup is now ready', ...payload })
    //   when a package comes in check driver queue
  if (driverQueue.isEmpty()) { 
       // if no drivers, enqueue to package queue
    vendorQueue.enqueue(payload);
  } else {
        // if there is a driver: dequeue the driver and send package
    const driverSocket = driverQueue.dequeue();
    driverSocket.emit(EVENT_NAMES.pickup, payload)
  }
}

// // emit to everyone who is prepared to listen
// socket.emit('recieved', { message: 'pickup acknowledge' })
// io.emit('announcement', { message: " a order is ready to be picked up" })

function handlePickedUp(payload) {
  console.log('the driver picked up the package', payload.orderId);
  caps.emit(EVENT_NAMES.pickedUp, payload);
}

function handleInTransit(payload) {
  console.log('the package is in transit', payload.orderId);
  caps.emit(EVENT_NAMES.inTransit, payload);
}


// on = listen
// emit = send

function handleDelivered(payload) {
  console.log(`the packge for ${payload.customer} has been delivered`);
  caps.emit(EVENT_NAMES.delivered, {
    orderId: payload.orderId,
    message: `the packge for ${payload.customer} has been delivered`
  });
}

function handleConnection(socket) {
  console.log('we have a new connection: ', socket.id);
  socket.on(EVENT_NAMES.pickup, (payload) => handlePickupReady(payload, socket))
  socket.on(EVENT_NAMES.pickedUp, handlePickedUp)
  socket.on(EVENT_NAMES.inTransit, handleInTransit)
  socket.on(EVENT_NAMES.delivered, handleDelivered)
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
  handleDriverReady,
  io,
  caps
}