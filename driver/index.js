'use strict';

// const events = require('../eventPool.js');

// events.on('pickupReady', pickupReady);



// function pickupReady(data) {
//   console.log({ event: 'pickupReady' }, 'driver: picked up order', data);
//   events.emit('inTransit', data)
//   events.emit('delivered', data)
// }

const { io } = require('socket.io-client');
const { EVENT_NAMES } = require('../utility.js');
const { handleReady } = require('./handler.js')
// ws means web socket
const client = io('ws://localhost:3000/caps');
client.on(EVENT_NAMES.announcement, (payload) => console.log(payload.message));
client.on(EVENT_NAMES.ready, (payload) => handleReady(payload, client))

module.exports = { client }